import AddressModel from "../../../Models/AddressModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function CreateAddressController(request, response) {
    try {
        const { id_user, name, district, city } = request.body;
        const error = [];

        if (!id_user) {
            error.push("id_user obrigatório!");
        }

        if (!name) {
            error.push("name obrigatório!");
        }

        if (!district) {
            error.push("district obrigatório!");
        }

        if (!city) {
            error.push("city obrigatório!");
        }

        if (error.length > 0) {
            return response.status(400).json({ error: error });
        }

        const user = await UserModel.findByPk(id_user);

        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }

        const address = await AddressModel.create({
            id_user: id_user,
            name: name,
            district: district,
            city: city
        });

        return response.status(201).json(address);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
