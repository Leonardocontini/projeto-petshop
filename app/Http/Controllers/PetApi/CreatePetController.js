import PetModel from "../../../Models/PetModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function CreatePetController(request, response) {
    try {
        const { id_user, name, species, breed, birth_date } = request.body;
        const error = [];

        if (!id_user) error.push("id_user obrigatório!");
        if (!name) error.push("name obrigatório!");
        if (!species) error.push("species obrigatório!");

        if (error.length > 0) {
            return response.status(400).json({ error });
        }

        const owner = await UserModel.findByPk(id_user);

        if (!owner) {
            return response.status(404).json({ error: "User not found" });
        }

        const pet = await PetModel.create({
            id_user,
            name,
            species,
            breed: breed || null,
            birth_date: birth_date || null
        });

        return response.status(201).json(pet);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
