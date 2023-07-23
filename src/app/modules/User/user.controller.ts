import { RequestHandler } from "express";
import { dbConnect } from "../../database/db";
import {v4 as uuidv4} from 'uuid'
// import bcrypt from 'bcryptjs';
//import { UserService } from "./user.service";

export const createUsers: RequestHandler = async (req, res, next) => {
  // const { user } = req.body
  const uid = uuidv4().substring(0,10)
  const userName = req.body['userName']
  const email = req.body['email']
  const password = req.body['password']
  const cpassword = req.body['cpassword']

  // const hashedPassword =await bcrypt.hash(password,10);
  // const hashedCPassword =await bcrypt.hash(cpassword,10);
  // console.log(hashedPassword+hashedCPassword)
  
   const RegSql = `INSERT INTO users(uid, userName, email, password, cpassword) VALUES (?, ?, ?, ?, ?)`


  try {

    if(password != cpassword){
      res.status(400).json({
        success: false,
        message: "Password and Confirm Password should be same",
      })
    }

    dbConnect.db.query(RegSql,[uid,userName,email,password,cpassword],(err,result)=>{

      if(err){

        res.status(400).json({
          success: false,
          message: "Registration Failed",
          data: err
        })

      } else {

        res.status(200).json({
          success: true,
          message: "successfully Registered!",
          data: result
        })
      }

    })


    // const result = await UserService.createUser(user)

  } catch (error) {
    next(error)

  }
}

export const UserController = {
  createUsers
}