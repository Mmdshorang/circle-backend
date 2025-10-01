import { Elysia } from 'elysia';
import { getUsers } from '../controllers/userController';

export default new Elysia().get('/users', getUsers);
