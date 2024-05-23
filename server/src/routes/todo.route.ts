import { Router } from 'express';
import {createTodo, deleteTodo, findAll, findById, updateTodo} from "../controllers/todo.controller";
import {validateToken} from "../middlewares/auth.middleware";

const router = Router();

router.post('/findAll', validateToken, findAll);

router.post('/findById', validateToken, findById);

router.post('/create', validateToken, createTodo);

router.put('/update', validateToken, updateTodo);

router.delete('/delete', validateToken, deleteTodo);

export { router };