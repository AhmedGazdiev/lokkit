import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { API_URL } from '@core/api.token';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { LogginingInterceptor } from '@core/interceptors/logging.interceptor';
import { environment } from '@environments/environment.dev';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        { provide: API_URL, useValue: environment.API_URL },
        { provide: HTTP_INTERCEPTORS, useClass: LogginingInterceptor }
    ]
};
