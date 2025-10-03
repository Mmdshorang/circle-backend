import { Elysia } from 'elysia';
import { getUsers } from '../controllers/userController';
import { authPlugin } from '../plugins/auth';

export const userRoutes = new Elysia().use(authPlugin).get('/users', async () => getUsers());
