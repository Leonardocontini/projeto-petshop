import postgres from '../../../database/connections/postgres.js';

export default async function UpdateUserController(request, response) {
    try {
        const { id } = request.params;
        const { name, email } = request.body;
        if (!name || !email) {
            return response.status(400).json({ error: 'Name and email are required' });
        }
        const result = await postgres.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === '23505') { // unique violation
            return response.status(409).json({ error: 'Email already exists' });
        }
        return response.status(500).json({ error: 'Internal server error' });
    }
}