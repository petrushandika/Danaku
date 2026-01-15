import { API_STATUS } from '../constants/api-codes';

export class ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;

  constructor(success: boolean, statusCode: number, message: string, data: T = null) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message?: string, statusCode?: number) {
    return new ApiResponse(
      true, 
      statusCode || API_STATUS.SUCCESS.CODE, 
      message || API_STATUS.SUCCESS.MESSAGE, 
      data
    );
  }

  static created<T>(data: T, message?: string) {
    return new ApiResponse(
      true, 
      API_STATUS.CREATED.CODE, 
      message || API_STATUS.CREATED.MESSAGE, 
      data
    );
  }

  static error(message?: string, statusCode?: number, data: any = null) {
    return new ApiResponse(
      false, 
      statusCode || API_STATUS.BAD_REQUEST.CODE, 
      message || API_STATUS.BAD_REQUEST.MESSAGE, 
      data
    );
  }
}
