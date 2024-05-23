import { Router } from 'express';
import { closeUser, createUser, getUser } from "../controllers/user.controller";

const router = Router();

router.post('/signup', createUser);

router.post('/signin', getUser);

router.post('/signout', closeUser);

export { router };