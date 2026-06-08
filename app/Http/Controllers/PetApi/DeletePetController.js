import PetModel from "../../../Models/PetModel.js";

export default async function DeletePetController(request, response) {
    try {
        const pet = await PetModel.findByPk(request.params.id);

        if (!pet) {
            return response.status(404).json({ error: "Pet not found" });
        }

        await pet.destroy();

        return response.status(204).send();
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
