import postgres from '../../../database/connections/postgres.js';

export default async function GetUserController(request, response) {
    try {
        const { id } = request.params;
        const result = await postgres.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}