import { RequestHandler } from "express";
import { dbConnect } from "../../database/db";
import {v4 as uuidv4} from 'uuid'
import { string } from "zod";


export const createUsers: RequestHandler = async (req, res, next) => {
  // const { user } = req.body
  const uid = uuidv4().substring(0,10)
  const userName = req.body['userName']
  const email = req.body['email']
  const password = req.body['password']
  const cpassword = req.body['cpassword']

  const emailExistQuery = `SELECT COUNT(*) as emailCnt FROM users WHERE email = '${email}'`

  dbConnect.db.query(emailExistQuery,(err,data)=>{

    const emailCnt =  data[0].emailCnt

    if(emailCnt>0){

      res.status(400).json({
              success: false,
              message: "User Already Exists In this Email!",
            })
    }else{
 
      const RegSql = `INSERT INTO users(uid, userName, email, password, cpassword) VALUES (?, ?, ?, ?, ?)`


      try {
    
        if(password != cpassword){
          res.status(400).json({
            success: false,
            message: "Password and Confirm Password should be same",
          })
    
        } else {
    
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
        }
    
    
      } catch (error) {
        next(error)
    
      }
    }
    

  })

}

export const login : RequestHandler = async (req,res,next) => {

  const email = req.body['email']
  const password = req.body['password']
  const logSql = `SELECT * FROM users WHERE email= ? AND password= ? `

  try {
    dbConnect.db.query(logSql,[email,password],(err,data)=>{
    
      if(err){
        
        res.status(400).json({
          success: false,
          message: "login Failed",
          data: err
        })
  
      } else {

        
      if(data !== undefined && data.length > 0){

        res.status(200).json({
          success: true,
          message: "successfully logged in!",
          data: data
        })
        
      } else{

        res.status(401).json({
          success: false,
          message: "Invalid login credentials",
          data: data
        })

      }
  }
     
  
  
    })
  } catch (error) {
    next(error)
    
  }


}

export const UserController = {
  createUsers,
  login
}