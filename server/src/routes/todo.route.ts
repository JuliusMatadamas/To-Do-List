import { Router } from 'express';
import {createTodo, deleteTodo, deleteTodoCompletes, findAll, findAllPendings, findAllCompletes, findById, updateTodo} from "../controllers/todo.controller";
import {validateToken} from "../middlewares/auth.middleware";

const router = Router();

router.post('/findAll', validateToken, findAll);

router.post('/findAll/pendings', validateToken, findAllPendings);

router.post('/findAll/completes', validateToken, findAllCompletes);

router.post('/findById', validateToken, findById);

router.post('/create', validateToken, createTodo);

router.put('/update', validateToken, updateTodo);

router.delete('/delete', validateToken, deleteTodo);

router.delete('/delete/completes', validateToken, deleteTodoCompletes);

export { router };