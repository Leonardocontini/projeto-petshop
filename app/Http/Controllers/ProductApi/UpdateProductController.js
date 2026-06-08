import ProductModel from "../../../Models/ProductModel.js";

export default async function UpdateProductController(request, response) {
    try {
        const { name, description, category, price, stock } = request.body;

        if (!name || !category || price === undefined || stock === undefined) {
            return response.status(400).json({ error: "name, category, price and stock are required" });
        }

        if (Number(price) <= 0 || Number(stock) < 0) {
            return response.status(400).json({ error: "price must be greater than zero and stock must be non-negative" });
        }

        const product = await ProductModel.findByPk(request.params.id);

        if (!product) {
            return response.status(404).json({ error: "Product not found" });
        }

        product.name = name;
        product.description = description || null;
        product.category = category;
        product.price = Number(price);
        product.stock = Number(stock);

        await product.save();

        return response.json(product);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
