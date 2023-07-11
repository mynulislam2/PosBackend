import IErorMessages from "./error";

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IErorMessages[]
}