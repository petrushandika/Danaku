import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const status = context.switchToHttp().getResponse().statusCode;
    const message = this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || 'Success';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: status,
        message: message,
        data: data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
