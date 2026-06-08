import OrderModel from "../../../Models/OrderModel.js";
import OrderItemModel from "../../../Models/OrderItemModel.js";
import ProductModel from "../../../Models/ProductModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function GetOrderController(request, response) {
    try {
        const order = await OrderModel.findByPk(request.params.id, {
            include: [
                { model: UserModel, as: "customer" },
                { model: OrderItemModel, as: "items", include: [{ model: ProductModel, as: "product" }] }
            ]
        });

        if (!order) {
            return response.status(404).json({ error: "Order not found" });
        }

        return response.json(order);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
