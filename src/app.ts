import express, { Application } from 'express'
import cors from 'cors'
import GlobalErrorHandler from './app/Middlewares/GlobalErrorHandler'
import { UserRoutes } from './app/modules/User/user.routes'
const app: Application = express()
app.use(cors())

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
