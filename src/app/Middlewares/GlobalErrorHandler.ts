import { ZodError } from 'zod';
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import IErrorMessages from '../../Interfaces/error'
import HandleValidation from '../../Errors/HandleValidation'
import config from '../../config'
import ApiError from '../../Errors/ApiError'
import { ErrorLogger } from '../../shared/logger'
import HandleZodValidation from '../../Errors/HandleZodError';
// import IErorMessages from '../../Interfaces/error'
const GlobalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development" ? console.log('🐱‍🏍GlobalErrorHandler', error)
    : ErrorLogger.error('🐱‍🏍GlobalErrorHandler', error)

  let statusCode = 500
  let message = "Something went wrong"
  let errorMessages: IErrorMessages[] = []
  if (error.name == "ValidationError") {
    const SimpleValidation = HandleValidation(error)
    statusCode = SimpleValidation.statusCode
    message = SimpleValidation.message
    errorMessages = SimpleValidation.errorMessages
  }
  else if (error instanceof ZodError) {
    const SimpleValidation = HandleZodValidation(error)
    statusCode = SimpleValidation.statusCode
    message = SimpleValidation.message
    errorMessages = SimpleValidation.errorMessages
  }
  else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error.message
    errorMessages = error?.message ? [
      {
        path: "",
        message: error.message,
      }
    ] : []
  }
  else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message ? [
      {
        path: "",
        message: error.message,
      }
    ] : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error.stack : undefined
  })
  next()
}
export default GlobalErrorHandler