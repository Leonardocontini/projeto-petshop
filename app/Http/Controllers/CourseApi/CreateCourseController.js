import CourseModel from "../../../Models/CourseModel.js";

export default async function CreateCourseController(request, response) {
    try {
        const { name, professor } = request.body;
        const error = [];

        if (!name) {
            error.push("name obrigatório!");
        }

        if (!professor) {
            error.push("professor obrigatório!");
        }

        if (error.length > 0) {
            return response.status(400).json({ error });
        }

        const course = await CourseModel.create({
            name: name,
            professor: professor
        });

        return response.status(201).json(course);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
