import CourseModel from "../../../Models/CourseModel.js";

export default async function UpdateCourseController(request, response) {
    try {
        const { id } = request.params;
        const { name, professor } = request.body;

        if (!name || !professor) {
            return response.status(400).json({
                error: "Name and professor are required"
            });
        }

        const course = await CourseModel.findByPk(id);

        if (!course) {
            return response.status(404).json({
                error: "Course not found"
            });
        }

        course.name = name;
        course.professor = professor;

        await course.save();

        return response.json(course);
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
