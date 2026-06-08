import UserModel from "../../../Models/UserModel.js";
import AddressModel from "../../../Models/AddressModel.js";
import PetModel from "../../../Models/PetModel.js";
import OrderModel from "../../../Models/OrderModel.js";

export default async function GetUserController(request, response) {
    try {
        const { id } = request.params;

        const user = await UserModel.findByPk(id, {
            include: [
                { model: AddressModel, as: "addresses" },
                { model: PetModel, as: "pets" },
                { model: OrderModel, as: "orders" }
            ]
        });

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        return response.json(user);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
