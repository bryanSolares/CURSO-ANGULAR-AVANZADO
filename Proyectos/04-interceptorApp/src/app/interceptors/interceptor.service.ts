import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'x-token':
        'abbbbbbbccccccddddddcañlkdfjalñdfkjañldfkjpiewja,knmdfopiad.aksdfoliaksdfpoqiwedfl.,kasjdf.aosdfiaslk',
    });

    const reqClone = req.clone({ headers });

    console.log('interceptor');
    return next.handle(reqClone).pipe(catchError(this.manejarError));
  }

  manejarError(error: HttpErrorResponse) {
    console.warn(error);
    console.log('sucedió un error');
    console.log('Error personalizado');
    return throwError([]);
  }
}
