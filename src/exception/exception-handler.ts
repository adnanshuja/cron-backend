import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  PayloadTooLargeException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ResponseModel } from 'src/model/response.model';

export class MyExceptionHandler {
  response: ResponseModel;
  constructor(response: ResponseModel) {
    this.response = response;
  }
  handle() {
    if (!this.response.error) {
      return;
    }
    this.response.error = parseInt(this.response.error);
    const message = this.response.message;
    switch (this.response.error) {
      case undefined: {
        break;
      }
      case 400: {
        throw new BadRequestException(message);
        break;
      }
      case 401: {
        throw new UnauthorizedException(message);
        break;
      }
      case 403: {
        throw new ForbiddenException(message);
        break;
      }
      case 404: {
        throw new NotFoundException(message);
        break;
      }
      case 405: {
        throw new MethodNotAllowedException(message);
      }
      case 406: {
        throw new NotAcceptableException(message);
      }
      case 408: {
        throw new RequestTimeoutException(message);
      }
      case 409: {
        throw new ConflictException(message);
      }
      case 410: {
        throw new GoneException(message);
      }
      case 413: {
        throw new PayloadTooLargeException(message);
      }
      case 500: {
        throw new InternalServerErrorException(message);
      }
      default: {
        throw new BadRequestException(message);
      }
    }
  }
}
