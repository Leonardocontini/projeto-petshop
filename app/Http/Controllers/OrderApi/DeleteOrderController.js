import OrderModel from "../../../Models/OrderModel.js";
import OrderItemModel from "../../../Models/OrderItemModel.js";
import sequelize from "../../../../database/connections/sequelize.js";

export default async function DeleteOrderController(request, response) {
    const transaction = await sequelize.transaction();

    try {
        const order = await OrderModel.findByPk(request.params.id, { transaction });

        if (!order) {
            await transaction.rollback();
            return response.status(404).json({ error: "Order not found" });
        }

        await OrderItemModel.destroy({
            where: {
                id_order: order.id
            },
            transaction
        });

        await order.destroy({ transaction });
        await transaction.commit();

        return response.status(204).send();
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
