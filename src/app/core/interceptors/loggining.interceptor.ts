import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogginingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`Request to url: ${req.url}`);

        return next.handle(req).pipe(
            tap({
                next: event => {
                    console.log(`Response from the url: ${req.url}`, event);
                },
                error: error => {
                    console.log('Error', error);
                }
            })
        );
    }
}
