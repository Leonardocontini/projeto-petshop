import CourseModel from "../../../Models/CourseModel.js";
import UserModel from "../../../Models/UserModel.js";

export default async function ListCourseController(request, response) {
    try {
        const pageRequest = Number(request.query.page) || 1;
        const limitRequest = Number(request.query.limit) || 10;

        const page = (pageRequest < 1) ? 1 : pageRequest;
        const limit = (limitRequest > 20) ? 20 : ((limitRequest < 1) ? 10 : limitRequest);
        const offset = (page - 1) * limit;

        let next = null;

        const { rows, count: total } = await CourseModel.findAndCountAll({
            include: [
                {
                    model: UserModel,
                    as: "users"
                }
            ],
            order: [["id", "ASC"]],
            limit: limit + 1,
            offset: offset,
            distinct: true
        });

        const courses = rows;

        if (courses.length > limit) {
            next = page + 1;
            courses.pop();
        }

        return response.json({
            page: page,
            limit: limit,
            total: total,
            next: next,
            data: courses
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
