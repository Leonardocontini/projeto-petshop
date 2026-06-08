import ProductModel from "../../../Models/ProductModel.js";

export default async function DeleteProductController(request, response) {
    try {
        const product = await ProductModel.findByPk(request.params.id);

        if (!product) {
            return response.status(404).json({ error: "Product not found" });
        }

        await product.destroy();

        return response.status(204).send();
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
