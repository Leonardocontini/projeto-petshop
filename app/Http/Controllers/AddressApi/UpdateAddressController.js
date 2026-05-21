import AddressModel from "../../../Models/AddressModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function UpdateAddressController(request, response) {
    try {
        const { id } = request.params;
        const { id_user, name, district, city } = request.body;

        if (!id_user || !name || !district || !city) {
            return response.status(400).json({
                error: "id_user, name, district and city are required"
            });
        }

        const address = await AddressModel.findByPk(id);

        if (!address) {
            return response.status(404).json({
                error: "Address not found"
            });
        }

        const user = await UserModel.findByPk(id_user);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        address.id_user = id_user;
        address.name = name;
        address.district = district;
        address.city = city;

        await address.save();

        return response.json(address);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
