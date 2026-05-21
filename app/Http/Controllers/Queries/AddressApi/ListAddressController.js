import postgres from '../../../database/connections/postgres.js';

export default async function ListAddressController(request, response) {
    try {
        const result = await postgres.query('SELECT * FROM addresses');
        return response.json(result.rows);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
}
