import { ZodError } from 'zod';
const HandleZodValidation = (error: ZodError) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,

    };
  });
  const statusCode = 400
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors
  }
}
export default HandleZodValidation