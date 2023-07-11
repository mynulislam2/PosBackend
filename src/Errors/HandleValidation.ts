import mongoose from "mongoose";
import { IGenericErrorResponse } from "../Interfaces/CommonReponse";

const HandleValidation = (err: mongoose.Error.ValidationError): IGenericErrorResponse => {
  const errors = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,

    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorMessages: errors,
  };
};

export default HandleValidation