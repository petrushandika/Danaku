import { HttpStatus } from '@nestjs/common';

export const API_STATUS = {
  // Successful Responses
  SUCCESS: {
    CODE: HttpStatus.OK, // 200
    MESSAGE: 'Success',
  },
  CREATED: {
    CODE: HttpStatus.CREATED, // 201
    MESSAGE: 'Resource created successfully',
  },
  ACCEPTED: {
    CODE: HttpStatus.ACCEPTED, // 202
    MESSAGE: 'Request accepted',
  },
  NO_CONTENT: {
    CODE: HttpStatus.NO_CONTENT, // 204
    MESSAGE: 'No content',
  },
  
  // Client Error Responses
  BAD_REQUEST: {
    CODE: HttpStatus.BAD_REQUEST, // 400
    MESSAGE: 'Bad request',
  },
  UNAUTHORIZED: {
    CODE: HttpStatus.UNAUTHORIZED, // 401
    MESSAGE: 'Unauthorized access',
  },
  FORBIDDEN: {
    CODE: HttpStatus.FORBIDDEN, // 403
    MESSAGE: 'Forbidden access',
  },
  NOT_FOUND: {
    CODE: HttpStatus.NOT_FOUND, // 404
    MESSAGE: 'Resource not found',
  },
  METHOD_NOT_ALLOWED: {
    CODE: HttpStatus.METHOD_NOT_ALLOWED, // 405
    MESSAGE: 'Method not allowed',
  },
  REQUEST_TIMEOUT: {
    CODE: HttpStatus.REQUEST_TIMEOUT, // 408
    MESSAGE: 'Request timeout',
  },
  CONFLICT: {
    CODE: HttpStatus.CONFLICT, // 409
    MESSAGE: 'Resource conflict',
  },
  UNPROCESSABLE: {
    CODE: HttpStatus.UNPROCESSABLE_ENTITY, // 422
    MESSAGE: 'Unprocessable entity',
  },
  TOO_MANY_REQUESTS: {
    CODE: HttpStatus.TOO_MANY_REQUESTS, // 429
    MESSAGE: 'Too many requests',
  },

  // Server Error Responses
  INTERNAL_ERROR: {
    CODE: HttpStatus.INTERNAL_SERVER_ERROR, // 500
    MESSAGE: 'Internal server error',
  },
  NOT_IMPLEMENTED: {
    CODE: HttpStatus.NOT_IMPLEMENTED, // 501
    MESSAGE: 'Not implemented',
  },
  BAD_GATEWAY: {
    CODE: HttpStatus.BAD_GATEWAY, // 502
    MESSAGE: 'Bad gateway',
  },
  SERVICE_UNAVAILABLE: {
    CODE: HttpStatus.SERVICE_UNAVAILABLE, // 503
    MESSAGE: 'Service unavailable',
  },
};
