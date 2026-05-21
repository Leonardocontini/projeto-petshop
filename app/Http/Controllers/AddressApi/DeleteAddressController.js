import AddressModel from "../../../Models/AddressModel.js";

export default async function DeleteAddressController(request, response) {
    try {
        const { id } = request.params;

        const address = await AddressModel.findByPk(id);

        if (!address) {
            return response.status(404).json({
                error: "Address not found"
            });
        }

        await address.destroy();

        return response.status(204).send();
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
