import AddressModel from "../../../Models/AddressModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function GetAddressController(request, response) {
    try {
        const { id } = request.params;

        const address = await AddressModel.findByPk(id, {
            include: [
                {
                    model: UserModel,
                    as: "user"
                }
            ]
        });

        if (!address) {
            return response.status(404).json({
                error: "Address not found"
            });
        }

        return response.json(address);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
