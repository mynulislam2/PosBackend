import express, { Application } from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import { UserRoutes } from './app/modules/User/user.routes'
import { CategoryRoutes } from './app/modules/category/category.routes';

const upload = multer();

import env from 'dotenv';
env.config();
const app: Application = express()
app.use(cors())
app.use(upload.any())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/category',CategoryRoutes)



export default app;
