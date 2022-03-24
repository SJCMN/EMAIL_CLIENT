import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap, filter } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log outgoing request
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq).pipe(
      filter((val) => val.type === HttpEventType.Sent),

      tap((val) => {
        console.log('Sent the request');
      })
    );
  }
}