import postgres from '../../../database/connections/postgres.js';

export default async function CreateUserController(request, response) {
    try {
        const { name, email } = request.body;

        const error = [];

        if (!name) {
            error.push("name obrigatório!");
        }

        if (!name || !email) {
            error.push("email obrigatório!");
        }

        if (error.length > 0) {
            return response.status(400).json({ error: error });
        }

        const result = await postgres.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === '23505') { // unique violation
            return response.status(409).json({ error: error.detail });
        }
        return response.status(500).json({ error: 'Internal server error' });
    }
}