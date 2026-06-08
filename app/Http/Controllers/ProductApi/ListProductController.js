import ProductModel from "../../../Models/ProductModel.js";

export default async function ListProductController(request, response) {
    try {
        const pageRequest = Number(request.query.page) || 1;
        const limitRequest = Number(request.query.limit) || 10;
        const page = pageRequest < 1 ? 1 : pageRequest;
        const limit = limitRequest > 20 ? 20 : (limitRequest < 1 ? 10 : limitRequest);
        const offset = (page - 1) * limit;

        const { rows, count: total } = await ProductModel.findAndCountAll({
            order: [["id", "ASC"]],
            limit: limit + 1,
            offset
        });

        const products = rows;
        const next = products.length > limit ? page + 1 : null;
        if (next) products.pop();

        return response.json({ page, limit, total, next, data: products });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    }
}
