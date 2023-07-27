import express, { Application } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/User/user.routes'

//import multer from 'multer';
//import bodyParser from 'body-parser';
import env from 'dotenv';
env.config();
const app: Application = express()
app.use(cors())
//app.use(multer())



//parser
//app.use(bodyParser)
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:true}))
 app.use(express.json())
 app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', UserRoutes)



export default app;
