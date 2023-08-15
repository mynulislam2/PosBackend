import { RequestHandler } from "express";

import { dbConnect } from "../../database/db";

export const createCategory: RequestHandler = async (req,res,next)=>{
     
    console.log(req)



}

export const categoryController = {
    createCategory
}