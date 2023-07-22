import express, { Application } from 'express'
import cors from 'cors'
import GlobalErrorHandler from './app/Middlewares/GlobalErrorHandler'
import { UserRoutes } from './app/modules/User/user.routes'
import mysql,{Pool,PoolOptions} from 'mysql2';
import env from 'dotenv';
env.config();
const app: Application = express()
app.use(cors())


const poolConfig:PoolOptions = { 

    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT||'3306',10),
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
  
};

const db : Pool = mysql.createPool(poolConfig);

db.getConnection((err,connection)=>{


    if (err) {

        console.error('Error connecting to the database:', err.message);

      } else {

        console.log('Connected to the database!');
        connection.release();

      }

})
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/users', UserRoutes)







// //Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError('Ore baba Error', 400)
//   // res.send('Working Successfully')
// })
app.use(GlobalErrorHandler)
export default app;
