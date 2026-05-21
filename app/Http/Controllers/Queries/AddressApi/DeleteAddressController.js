import postgres from '../../../database/connections/postgres.js';

export default async function DeleteAddressController(request, response) {
    try {
        const { id } = request.params;
        const result = await postgres.query('DELETE FROM addresses WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return response.status(404).json({ error: 'Address not found' });
        }

        return response.status(204).send();
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
