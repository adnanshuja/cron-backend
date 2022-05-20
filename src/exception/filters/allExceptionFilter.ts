import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {

    let err = exception
    if (typeof exception === 'object' && exception !== null && 'response' in exception)
      err = exception['response']

     err =
      typeof err === 'string'
        ? { message: exception }
        : (err as object);


    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    response
      .json({
        ...err,
        timestamp: new Date().toISOString(),
      });
  }
}