import postgres from '../../../database/connections/postgres.js';

export default async function UpdateAddressController(request, response) {
    try {
        const { id } = request.params;
        const { name, district, city } = request.body;

        if (!name || !district || !city) {
            return response.status(400).json({ error: 'Name, district and city are required' });
        }

        const result = await postgres.query(
            'UPDATE addresses SET name = $1, district = $2, city = $3 WHERE id = $4 RETURNING *',
            [name, district, city, id]
        );

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Address not found' });
        }

        return response.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
