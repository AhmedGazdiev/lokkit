import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_URL } from '@core/api.token';
import { authInterceptor } from '@core/interceptors';
import { environment } from '@environments/environment.dev';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        { provide: API_URL, useValue: environment.API_URL }
    ]
};
