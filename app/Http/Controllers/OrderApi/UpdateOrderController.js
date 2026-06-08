import OrderModel from "../../../Models/OrderModel.js";

const allowedStatus = ["pending", "paid", "sent", "delivered", "cancelled"];

export default async function UpdateOrderController(request, response) {
    try {
        const { status } = request.body;

        if (!allowedStatus.includes(status)) {
            return response.status(400).json({ error: `status must be one of: ${allowedStatus.join(", ")}` });
        }

        const order = await OrderModel.findByPk(request.params.id);

        if (!order) {
            return response.status(404).json({ error: "Order not found" });
        }

        order.status = status;
        await order.save();

        return response.json(order);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
