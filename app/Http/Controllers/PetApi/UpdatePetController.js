import PetModel from "../../../Models/PetModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function UpdatePetController(request, response) {
    try {
        const { id_user, name, species, breed, birth_date } = request.body;

        if (!id_user || !name || !species) {
            return response.status(400).json({ error: "id_user, name and species are required" });
        }

        const pet = await PetModel.findByPk(request.params.id);

        if (!pet) {
            return response.status(404).json({ error: "Pet not found" });
        }

        const owner = await UserModel.findByPk(id_user);

        if (!owner) {
            return response.status(404).json({ error: "User not found" });
        }

        pet.id_user = id_user;
        pet.name = name;
        pet.species = species;
        pet.breed = breed || null;
        pet.birth_date = birth_date || null;

        await pet.save();

        return response.json(pet);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
