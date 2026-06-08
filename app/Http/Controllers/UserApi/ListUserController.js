import AddressModel from "../../../Models/AddressModel.js";
import UserModel from "../../../Models/UserModel.js";
import PetModel from "../../../Models/PetModel.js";
import OrderModel from "../../../Models/OrderModel.js";

export default async function ListUserController(request, response) {
    try {
        const pageRequest = Number(request.query.page) || 1;
        const limitRequest = Number(request.query.limit) || 10;

        const page = (pageRequest < 1) ? 1 : pageRequest;
        const limit = (limitRequest > 20) ? 20 : ((limitRequest < 1) ? 10 : limitRequest);
        const offset = (page - 1) * limit;

        let next = null;

        const { rows, count: total } = await UserModel.findAndCountAll({
            include: [
                {
                    model: AddressModel,
                    as: "addresses"
                },
                {
                    model: PetModel,
                    as: "pets"
                },
                {
                    model: OrderModel,
                    as: "orders"
                }
            ],
            order: [["id", "ASC"]],
            limit: limit + 1,
            offset: offset,
            distinct: true
        });

        const users = rows;

        if (users.length > limit) {
            next = page + 1;
            users.pop();
        }

        return response.json({
            page: page,
            limit: limit,
            total: total,
            next: next,
            data: users
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
