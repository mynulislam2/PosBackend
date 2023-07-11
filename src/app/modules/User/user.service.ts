import ApiError from "../../../Errors/ApiError";
import config from "../../../config";
import { IUser } from "./user.inferface";
import { User } from "./user.model";
import { generateId } from "./user.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateId()
  user.id = id

  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  // console.log(user)
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError('Fail to create user!', 400)
  }
  return createdUser
}
export const UserService = {
  createUser
}