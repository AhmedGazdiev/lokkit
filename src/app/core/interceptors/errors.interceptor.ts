import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let message = '';
                if (error.error instanceof ErrorEvent) {
                    message = `Error: ${error.error.message}`;
                } else {
                    message = `Error: ${error.status}: ${error.message}`;
                }
                console.error(message);
                return throwError(() => new Error(message));
            })
        );
    }
}
