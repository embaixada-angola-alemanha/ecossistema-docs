import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

/** Injection token for the base API URL (e.g. '/api/v1' or '/api/v1/public') */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

/** Standard API response wrapper from all Ecossistema backends */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  timestamp?: string;
}

/** Paginated response data */
export interface PagedData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

/** API error with structured information */
export interface ApiError {
  status: number;
  message: string;
  timestamp?: string;
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

@Injectable({ providedIn: 'root' })
export class ApiClientService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  get<T>(path: string, params?: QueryParams): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}${path}`, { params: this.buildParams(params) })
      .pipe(
        map(res => res.data),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  getPaged<T>(path: string, params?: QueryParams): Observable<PagedData<T>> {
    return this.get<PagedData<T>>(path, params);
  }

  post<T>(path: string, body: unknown, params?: QueryParams): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${path}`, body, { params: this.buildParams(params) })
      .pipe(
        map(res => res.data),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  put<T>(path: string, body: unknown, params?: QueryParams): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}${path}`, body, { params: this.buildParams(params) })
      .pipe(
        map(res => res.data),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  patch<T>(path: string, body: unknown, params?: QueryParams): Observable<T> {
    return this.http
      .patch<ApiResponse<T>>(`${this.baseUrl}${path}`, body, { params: this.buildParams(params) })
      .pipe(
        map(res => res.data),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  delete<T = void>(path: string, params?: QueryParams): Observable<T> {
    return this.http
      .delete<ApiResponse<T> | void>(`${this.baseUrl}${path}`, { params: this.buildParams(params) })
      .pipe(
        map(res => (res as ApiResponse<T>)?.data ?? (undefined as T)),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  /** Upload a file via multipart/form-data */
  upload<T>(path: string, file: File, fieldName = 'file'): Observable<T> {
    const formData = new FormData();
    formData.append(fieldName, file);
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${path}`, formData)
      .pipe(
        map(res => res.data),
        catchError(err => throwError(() => this.toApiError(err)))
      );
  }

  private buildParams(params?: QueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  private toApiError(err: unknown): ApiError {
    const httpErr = err as { status?: number; error?: { message?: string }; message?: string };
    return {
      status: httpErr.status ?? 0,
      message: httpErr.error?.message ?? httpErr.message ?? 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
}
