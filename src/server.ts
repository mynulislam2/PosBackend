import app from './app'
//import { dbConnect } from './app/database/db'
import env from 'dotenv'
env.config()

const port = process.env.PORT;

app.listen(port,()=> console.log(`App Running On port :${port}`))








