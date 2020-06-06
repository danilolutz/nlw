import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${process.env.API_URL}/uploads/${item.image}`, // Your LAN ip.
            }
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;