// WN API Services — Generated (stubs until OpenAPI generation)

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Configuration } from './configuration';
import {
  ApiResponse, PagedData,
  ArticleResponse, CategoryResponse, TagResponse, AuthorResponse,
  ArticleVersionResponse, EditorialCommentResponse, ShareLinks,
  MediaFileResponse, NewsletterSubscribeRequest
} from './model';

@Injectable({ providedIn: 'root' })
export class ArticleApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getPublished(page = 0, size = 12): Observable<PagedData<ArticleResponse>> {
    return this.http.get<ApiResponse<PagedData<ArticleResponse>>>(`${this.config.basePath}/public/articles`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getBySlug(slug: string): Observable<ArticleResponse> {
    return this.http.get<ApiResponse<ArticleResponse>>(`${this.config.basePath}/public/articles/${slug}`)
      .pipe(map(r => r.data));
  }

  getFeatured(): Observable<ArticleResponse[]> {
    return this.http.get<ApiResponse<ArticleResponse[]>>(`${this.config.basePath}/public/articles/featured`)
      .pipe(map(r => r.data));
  }

  getByCategory(categoryId: string, page = 0, size = 12): Observable<PagedData<ArticleResponse>> {
    return this.http.get<ApiResponse<PagedData<ArticleResponse>>>(`${this.config.basePath}/public/articles/category/${categoryId}`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getByTag(tagId: string, page = 0, size = 12): Observable<PagedData<ArticleResponse>> {
    return this.http.get<ApiResponse<PagedData<ArticleResponse>>>(`${this.config.basePath}/public/articles/tag/${tagId}`, { params: new HttpParams().set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  search(query: string, page = 0, size = 12): Observable<PagedData<ArticleResponse>> {
    return this.http.get<ApiResponse<PagedData<ArticleResponse>>>(`${this.config.basePath}/public/articles/search`, { params: new HttpParams().set('q', query).set('page', page).set('size', size) })
      .pipe(map(r => r.data));
  }

  getShareLinks(slug: string): Observable<ShareLinks> {
    return this.http.get<ApiResponse<ShareLinks>>(`${this.config.basePath}/public/articles/${slug}/share`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(): Observable<CategoryResponse[]> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(`${this.config.basePath}/public/articles/categories`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class TagApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getAll(): Observable<TagResponse[]> {
    return this.http.get<ApiResponse<TagResponse[]>>(`${this.config.basePath}/public/articles/tags`)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class EditorialApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  getVersions(articleId: string): Observable<ArticleVersionResponse[]> {
    return this.http.get<ApiResponse<ArticleVersionResponse[]>>(`${this.config.basePath}/editorial/articles/${articleId}/versions`)
      .pipe(map(r => r.data));
  }

  getComments(articleId: string): Observable<EditorialCommentResponse[]> {
    return this.http.get<ApiResponse<EditorialCommentResponse[]>>(`${this.config.basePath}/editorial/articles/${articleId}/comments`)
      .pipe(map(r => r.data));
  }

  submit(articleId: string): Observable<ArticleResponse> {
    return this.http.patch<ApiResponse<ArticleResponse>>(`${this.config.basePath}/editorial/articles/${articleId}/submit`, {})
      .pipe(map(r => r.data));
  }

  publish(articleId: string): Observable<ArticleResponse> {
    return this.http.patch<ApiResponse<ArticleResponse>>(`${this.config.basePath}/editorial/articles/${articleId}/publish`, {})
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class NewsletterApiService {
  private readonly http = inject(HttpClient);
  private config = new Configuration();

  subscribe(request: NewsletterSubscribeRequest): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.config.basePath}/public/newsletter/subscribe`, request)
      .pipe(map(r => r.data));
  }
}

@Injectable({ providedIn: 'root' })
export class MediaWnApiService {
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
}
