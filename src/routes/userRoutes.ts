import { Elysia } from 'elysia';
import { getUsers } from '../controllers/userController';

export const userRoutes = new Elysia().get('/users', async () => getUsers());
