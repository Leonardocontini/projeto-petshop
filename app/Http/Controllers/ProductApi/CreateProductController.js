import ProductModel from "../../../Models/ProductModel.js";

export default async function CreateProductController(request, response) {
    try {
        const { name, description, category, price, stock } = request.body;
        const error = [];

        if (!name) error.push("name obrigatório!");
        if (!category) error.push("category obrigatório!");
        if (price === undefined || Number(price) <= 0) error.push("price deve ser maior que zero!");
        if (stock === undefined || Number(stock) < 0) error.push("stock deve ser maior ou igual a zero!");

        if (error.length > 0) {
            return response.status(400).json({ error });
        }

        const product = await ProductModel.create({
            name,
            description: description || null,
            category,
            price: Number(price),
            stock: Number(stock)
        });

        return response.status(201).json(product);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
