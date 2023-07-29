import express from 'express';
import { UserController } from './user.controller';
// import validateRequest from '../../Middlewares/ValidRequest';
// import { UserValidation } from './user.validation';
const router = express.Router();

router.post('/create-user',UserController.createUsers)
router.post('/login',UserController.login)
export const UserRoutes = router