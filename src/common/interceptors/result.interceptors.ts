import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return { result: { message: 'Nothing found!' } };
        }
        return { result: validate(data) };
      }),
    );
  }
}

const validate = (data: any) => {
  const sanitizedData = { ...data };

  // Field names to excluse
  const sensitiveFields = ['password', 'authCode'];

  // Iterate over the sensitive field names and remove
  sensitiveFields.forEach((field) => {
    if (sanitizedData.user && sanitizedData.user.hasOwnProperty(field)) {
      delete sanitizedData.user[field];
    }
  });

  return sanitizedData;
};
