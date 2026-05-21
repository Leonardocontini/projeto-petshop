import postgres from '../../../database/connections/postgres.js';

export default async function CreateAddressController(request, response) {
    try {
        const { name, district, city, id_user } = request.body;
        const error = [];

        if (!name) {
            error.push('name obrigatório!');
        }
        if (!district) {
            error.push('district obrigatório!');
        }
        if (!city) {
            error.push('city obrigatório!');
        }

        if (error.length > 0) {
            return response.status(400).json({ error });
        }

        const result = await postgres.query(
            'INSERT INTO addresses (name, district, city) VALUES ($1, $2, $3) RETURNING *',
            [name, district, city]
        );

        return response.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
