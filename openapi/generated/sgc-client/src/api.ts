// SGC API Services — Generated (stubs until OpenAPI generation)

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Configuration } from './configuration';
import {
  ApiResponse, PagedData,
  CidadaoResponse, CidadaoCreateRequest, EstadoCidadao, Sexo,
  ProcessoResponse, DocumentoResponse, VistoResponse,
  AgendamentoResponse, NotificacaoResponse
} from './model';

@Injectable({ providedIn: 'root' })
export class CidadaoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20, search?: string, estado?: EstadoCidadao, sexo?: Sexo): Observable<PagedData<CidadaoResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (search) params = params.set('search', search);
    if (estado) params = params.set('estado', estado);
    if (sexo) params = params.set('sexo', sexo);
    return this.http.get<ApiResponse<PagedData<CidadaoResponse>>>(`${this.config.basePath}/cidadaos`, { params })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<CidadaoResponse> {
    return this.http.get<ApiResponse<CidadaoResponse>>(`${this.config.basePath}/cidadaos/${id}`)
      .pipe(map(r => r.data));
  }

  create(request: CidadaoCreateRequest): Observable<CidadaoResponse> {
    return this.http.post<ApiResponse<CidadaoResponse>>(`${this.config.basePath}/cidadaos`, request)
      .pipe(map(r => r.data));
  }

  updateEstado(id: string, estado: EstadoCidadao): Observable<CidadaoResponse> {
    return this.http.patch<ApiResponse<CidadaoResponse>>(`${this.config.basePath}/cidadaos/${id}/estado`, { estado })
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.basePath}/cidadaos/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ProcessoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20, cidadaoId?: string, tipo?: string, estado?: string): Observable<PagedData<ProcessoResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (cidadaoId) params = params.set('cidadaoId', cidadaoId);
    if (tipo) params = params.set('tipo', tipo);
    if (estado) params = params.set('estado', estado);
    return this.http.get<ApiResponse<PagedData<ProcessoResponse>>>(`${this.config.basePath}/processos`, { params })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<ProcessoResponse> {
    return this.http.get<ApiResponse<ProcessoResponse>>(`${this.config.basePath}/processos/${id}`)
      .pipe(map(r => r.data));
  }

  updateEstado(id: string, estado: string, comentario?: string): Observable<ProcessoResponse> {
    return this.http.patch<ApiResponse<ProcessoResponse>>(`${this.config.basePath}/processos/${id}/estado`, { estado, comentario })
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class VistoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20): Observable<PagedData<VistoResponse>> {
    return this.http.get<ApiResponse<PagedData<VistoResponse>>>(`${this.config.basePath}/vistos`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<VistoResponse> {
    return this.http.get<ApiResponse<VistoResponse>>(`${this.config.basePath}/vistos/${id}`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class DocumentoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  upload(processoId: string, file: File): Observable<DocumentoResponse> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post<ApiResponse<DocumentoResponse>>(`${this.config.basePath}/processos/${processoId}/documentos`, fd)
      .pipe(map(r => r.data));
  }

  getByProcesso(processoId: string): Observable<DocumentoResponse[]> {
    return this.http.get<ApiResponse<DocumentoResponse[]>>(`${this.config.basePath}/processos/${processoId}/documentos`)
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.basePath}/documentos/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class AgendamentoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20, data?: string): Observable<PagedData<AgendamentoResponse>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (data) params = params.set('data', data);
    return this.http.get<ApiResponse<PagedData<AgendamentoResponse>>>(`${this.config.basePath}/agendamentos`, { params })
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class NotificacaoApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20): Observable<PagedData<NotificacaoResponse>> {
    return this.http.get<ApiResponse<PagedData<NotificacaoResponse>>>(`${this.config.basePath}/notificacoes`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  markRead(id: string): Observable<NotificacaoResponse> {
    return this.http.patch<ApiResponse<NotificacaoResponse>>(`${this.config.basePath}/notificacoes/${id}/read`, {})
      .pipe(map(r => r.data));
  }
}
