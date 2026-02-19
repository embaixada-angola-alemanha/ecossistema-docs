// GPJ API Services — Generated (stubs until OpenAPI generation)

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Configuration } from './configuration';
import {
  ApiResponse, PagedData,
  ProjectResponse, SprintResponse, TaskResponse, TaskCreateRequest,
  MilestoneResponse, TimeLogResponse, DashboardResumo, TaskStatus
} from './model';

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(page = 0, size = 20): Observable<PagedData<ProjectResponse>> {
    return this.http.get<ApiResponse<PagedData<ProjectResponse>>>(`${this.config.basePath}/projects`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<ProjectResponse> {
    return this.http.get<ApiResponse<ProjectResponse>>(`${this.config.basePath}/projects/${id}`)
      .pipe(map(r => r.data));
  }

  getDashboard(): Observable<DashboardResumo> {
    return this.http.get<ApiResponse<DashboardResumo>>(`${this.config.basePath}/projects/dashboard`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class SprintApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getByProject(projectId: string): Observable<SprintResponse[]> {
    return this.http.get<ApiResponse<SprintResponse[]>>(`${this.config.basePath}/projects/${projectId}/sprints`)
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<SprintResponse> {
    return this.http.get<ApiResponse<SprintResponse>>(`${this.config.basePath}/sprints/${id}`)
      .pipe(map(r => r.data));
  }

  getActive(): Observable<SprintResponse | null> {
    return this.http.get<ApiResponse<SprintResponse | null>>(`${this.config.basePath}/sprints/active`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(options?: { sprintId?: string; status?: TaskStatus; assignee?: string; page?: number; size?: number }): Observable<PagedData<TaskResponse>> {
    let params = new HttpParams()
      .set('page', options?.page ?? 0)
      .set('size', options?.size ?? 200);
    if (options?.sprintId) params = params.set('sprintId', options.sprintId);
    if (options?.status) params = params.set('status', options.status);
    if (options?.assignee) params = params.set('assignee', options.assignee);
    return this.http.get<ApiResponse<PagedData<TaskResponse>>>(`${this.config.basePath}/tasks`, { params })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<TaskResponse> {
    return this.http.get<ApiResponse<TaskResponse>>(`${this.config.basePath}/tasks/${id}`)
      .pipe(map(r => r.data));
  }

  create(request: TaskCreateRequest): Observable<TaskResponse> {
    return this.http.post<ApiResponse<TaskResponse>>(`${this.config.basePath}/tasks`, request)
      .pipe(map(r => r.data));
  }

  updateStatus(id: string, status: TaskStatus): Observable<TaskResponse> {
    return this.http.patch<ApiResponse<TaskResponse>>(`${this.config.basePath}/tasks/${id}/status`, { status })
      .pipe(map(r => r.data));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.config.basePath}/tasks/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class MilestoneApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getByProject(projectId: string): Observable<MilestoneResponse[]> {
    return this.http.get<ApiResponse<MilestoneResponse[]>>(`${this.config.basePath}/projects/${projectId}/milestones`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class TimeLogApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getByTask(taskId: string): Observable<TimeLogResponse[]> {
    return this.http.get<ApiResponse<TimeLogResponse[]>>(`${this.config.basePath}/tasks/${taskId}/timelogs`)
      .pipe(map(r => r.data));
  }

  log(taskId: string, horas: number, descricao?: string): Observable<TimeLogResponse> {
    return this.http.post<ApiResponse<TimeLogResponse>>(`${this.config.basePath}/tasks/${taskId}/timelogs`, { horas, descricao })
      .pipe(map(r => r.data));
  }
}
