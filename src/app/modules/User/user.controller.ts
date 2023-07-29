import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";

export const createUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body
  try {



    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: "successfully created user",
      data: result
    })
  } catch (error) {
    next(error)

  }
}

export const UserController = {
  createUsers
}