import PetModel from "../../../Models/PetModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function GetPetController(request, response) {
    try {
        const pet = await PetModel.findByPk(request.params.id, {
            include: [{ model: UserModel, as: "owner" }]
        });

        if (!pet) {
            return response.status(404).json({ error: "Pet not found" });
        }

        return response.json(pet);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
