// SI API Services — Generated (stubs until OpenAPI generation)

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Configuration } from './configuration';
import {
  ApiResponse, PagedData,
  PageResponse, EventResponse, MenuResponse, ContactResponse, MediaFileResponse
} from './model';

@Injectable({ providedIn: 'root' })
export class PageApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20, estado?: string): Observable<PagedData<PageResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (estado) params = params.set('estado', estado);
    return this.http.get<ApiResponse<PagedData<PageResponse>>>(`${this.config.basePath}/pages`, { params })
      .pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<PageResponse> {
    return this.http.get<ApiResponse<PageResponse>>(`${this.config.basePath}/public/pages/${slug}`)
      .pipe(map(r => r.data));
  }

  getPublished(page = 0, size = 20): Observable<PagedData<PageResponse>> {
    return this.http.get<ApiResponse<PagedData<PageResponse>>>(`${this.config.basePath}/public/pages`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class EventApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20): Observable<PagedData<EventResponse>> {
    return this.http.get<ApiResponse<PagedData<EventResponse>>>(`${this.config.basePath}/events`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getUpcoming(limit = 5): Observable<EventResponse[]> {
    return this.http.get<ApiResponse<EventResponse[]>>(`${this.config.basePath}/public/events/upcoming`, { params: new HttpParams().set('limit', limit) })
      .pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<EventResponse> {
    return this.http.get<ApiResponse<EventResponse>>(`${this.config.basePath}/public/events/${slug}`)
      .pipe(map(r => r.data));
  }

  getFeatured(): Observable<EventResponse[]> {
    return this.http.get<ApiResponse<EventResponse[]>>(`${this.config.basePath}/public/events/featured`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class MenuApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getByTipo(tipo: string): Observable<MenuResponse> {
    return this.http.get<ApiResponse<MenuResponse>>(`${this.config.basePath}/public/menus/${tipo}`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(): Observable<ContactResponse[]> {
    return this.http.get<ApiResponse<ContactResponse[]>>(`${this.config.basePath}/public/contacts`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class MediaApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  upload(file: File): Observable<MediaFileResponse> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<ApiResponse<MediaFileResponse>>(`${this.config.basePath}/media`, fd)
      .pipe(map(r => r.data));
  }

  getAll(page = 0, size = 20): Observable<PagedData<MediaFileResponse>> {
    return this.http.get<ApiResponse<PagedData<MediaFileResponse>>>(`${this.config.basePath}/media`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.basePath}/media/${id}`);
  }
}
