import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '@core/api.token';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly http = inject(HttpClient);
    private readonly URL = inject(API_URL);

    public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
        return this.http.get<T>(`${this.URL}${url}`, {
            headers: this.headers,
            params
        });
    }

    public post<T, D>(url: string, data?: D): Observable<T> {
        return this.http.post<T>(`${this.URL}${url}`, JSON.stringify(data), {
            headers: this.headers,
            withCredentials: true
        });
    }

    public put<T, D>(url: string, data: D): Observable<T> {
        return this.http.put<T>(`${this.URL}${url}`, JSON.stringify(data), {
            headers: this.headers
        });
    }

    public patch<T, D>(url: string, data: D): Observable<T> {
        return this.http.patch<T>(`${this.URL}${url}`, JSON.stringify(data), {
            headers: this.headers
        });
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(`${this.URL}${url}`, {
            headers: this.headers
        });
    }

    private get headers(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };
        return new HttpHeaders(headersConfig);
    }
}
