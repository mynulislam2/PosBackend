import mysql,{Pool,PoolOptions} from 'mysql2';
import env from 'dotenv';
env.config();
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

export const dbConnect = {
    db
  }