import sequelize from "../../../../database/connections/sequelize.js";
import OrderModel from "../../../Models/OrderModel.js";
import OrderItemModel from "../../../Models/OrderItemModel.js";
import ProductModel from "../../../Models/ProductModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function CreateOrderController(request, response) {
    const transaction = await sequelize.transaction();

    try {
        const { id_user, items } = request.body;

        if (!id_user || !Array.isArray(items) || items.length === 0) {
            await transaction.rollback();
            return response.status(400).json({ error: "id_user and a non-empty items array are required" });
        }

        const customer = await UserModel.findByPk(id_user, { transaction });

        if (!customer) {
            await transaction.rollback();
            return response.status(404).json({ error: "User not found" });
        }

        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const idProduct = item.id_product;
            const quantity = Number(item.quantity);

            if (!idProduct || !Number.isInteger(quantity) || quantity <= 0) {
                await transaction.rollback();
                return response.status(400).json({ error: "Each item needs id_product and positive integer quantity" });
            }

            const product = await ProductModel.findByPk(idProduct, { transaction, lock: transaction.LOCK.UPDATE });

            if (!product) {
                await transaction.rollback();
                return response.status(404).json({ error: `Product ${idProduct} not found` });
            }

            if (product.stock < quantity) {
                await transaction.rollback();
                return response.status(400).json({ error: `Insufficient stock for product ${product.id}` });
            }

            const unitPrice = Number(product.price);
            total += unitPrice * quantity;
            product.stock -= quantity;
            await product.save({ transaction });

            orderItems.push({
                id_product: product.id,
                quantity,
                unit_price: unitPrice
            });
        }

        const order = await OrderModel.create({
            id_user,
            status: "pending",
            total: total.toFixed(2)
        }, { transaction });

        await OrderItemModel.bulkCreate(orderItems.map((item) => ({
            ...item,
            id_order: order.id
        })), { transaction });

        await transaction.commit();

        const orderWithItems = await OrderModel.findByPk(order.id, {
            include: [{ model: OrderItemModel, as: "items", include: [{ model: ProductModel, as: "product" }] }]
        });

        return response.status(201).json(orderWithItems);
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
