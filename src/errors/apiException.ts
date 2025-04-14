import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(status: HttpStatus, message: string | object) {
    super(message, status);
  }

  static BadRequest(message: string | object) {
    return new ApiException(HttpStatus.BAD_REQUEST, message);
  }

  static NotFound(message: string | object) {
    return new ApiException(HttpStatus.NOT_FOUND, message);
  }

  static Conflict(message: string | object) {
    return new ApiException(HttpStatus.CONFLICT, message);
  }
}
