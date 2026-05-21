import UserModel from "../../../Models/UserModel.js";
import CourseModel from "../../../Models/CourseModel.js";
import CourseUserModel from "../../../Models/CourseUserModel.js";

/**
 * Adiciona múltiplos cursos a um usuário usando a tabela pivot course_user.
 *
 * Rota: POST /users/add-course/:id
 * Parâmetros:
 *   - id: id do usuário na URL
 * Body esperado:
 *   [id1, id2, ...] onde cada idN é o id do curso a ser associado
 */
export default async function AddCourseController(request, response) {
    try {
        // Pega o id do usuário da rota e os ids de curso do corpo da requisição
        const { id } = request.params;
        const courseIds = request.body;

        // Validação básica: body deve ser um array não vazio
        if (!Array.isArray(courseIds) || courseIds.length === 0) {
            return response.status(400).json({
                error: "Body must be a non-empty array of course IDs"
            });
        }

        // Garante que todos os valores são inteiros positivos
        const invalidIds = courseIds.filter((courseId) => !Number.isInteger(courseId) || courseId <= 0);

        if (invalidIds.length > 0) {
            return response.status(400).json({
                error: "Body must contain only valid positive integer course IDs",
                invalidIds
            });
        }

        // Verifica se o usuário existe
        const user = await UserModel.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        // Busca todos os cursos informados no array para validar existência
        const courses = await CourseModel.findAll({
            where: {
                id: courseIds
            }
        });

        const foundCourseIds = courses.map((course) => course.id);
        const missingCourseIds = courseIds.filter((courseId) => !foundCourseIds.includes(courseId));

        if (missingCourseIds.length > 0) {
            return response.status(404).json({
                error: "Some course IDs were not found",
                missingCourseIds
            });
        }

        // Verifica quais relações já existem para evitar duplicações
        const existingRelations = await CourseUserModel.findAll({
            where: {
                id_user: id,
                id_course: courseIds
            }
        });

        const existingCourseIds = existingRelations.map((relation) => relation.id_course);
        const newCourseIds = courseIds.filter((courseId) => !existingCourseIds.includes(courseId));

        // Se todos os cursos já estiverem associados, retorna 200 com informação
        if (newCourseIds.length === 0) {
            return response.status(200).json({
                message: "Courses already linked to user",
                added: [],
                existingCourseIds
            });
        }

        // Prepara os registros a serem inseridos na tabela pivot
        const relationsToCreate = newCourseIds.map((courseId) => ({
            id_user: id,
            id_course: courseId
        }));

        await CourseUserModel.bulkCreate(relationsToCreate);

        return response.status(201).json({
            message: "Courses added to user",
            added: newCourseIds,
            existingCourseIds
        });
    } catch (error) {
        console.error(error);

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}
