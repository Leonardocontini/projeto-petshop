import postgres from '../../../database/connections/postgres.js';

export default async function DeleteUserController(request, response) {
    try {
        const { id } = request.params;
        const result = await postgres.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}