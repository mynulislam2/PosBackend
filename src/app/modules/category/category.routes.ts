import express from 'express';
const router = express.Router();
import uploadImage from '../../Middlewares/ImageUploadMiddleware'
import { categoryController } from './category.controller';

router.post('/create-category',uploadImage) 

export const CategoryRoutes = router
