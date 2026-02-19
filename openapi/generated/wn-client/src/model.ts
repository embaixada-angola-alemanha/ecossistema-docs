// WN API Models — Generated types (stubs until OpenAPI generation)

export type UUID = string;
export type ISODateString = string;

export type EstadoArtigo = 'DRAFT' | 'SUBMITTED' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface CategoryResponse {
  id: UUID;
  nomePt: string;
  nomeEn?: string;
  nomeDe?: string;
  slug: string;
  descricaoPt?: string;
  descricaoEn?: string;
  descricaoDe?: string;
  cor?: string;
  icone?: string;
  sortOrder: number;
  activo: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TagResponse {
  id: UUID;
  nomePt: string;
  nomeEn?: string;
  nomeDe?: string;
  slug: string;
  createdAt: ISODateString;
}

export interface AuthorResponse {
  id: UUID;
  nome: string;
  bio?: string;
  fotoUrl?: string;
  email?: string;
  cargo?: string;
  activo: boolean;
  keycloakId?: string;
  createdAt: ISODateString;
}

export interface ArticleResponse {
  id: UUID;
  tituloPt: string;
  tituloEn?: string;
  tituloDe?: string;
  slug: string;
  leadPt: string;
  leadEn?: string;
  leadDe?: string;
  corpoPt: string;
  corpoEn?: string;
  corpoDe?: string;
  imagemDestaqueUrl?: string;
  legendaImagem?: string;
  estado: EstadoArtigo;
  destaque: boolean;
  views: number;
  category: CategoryResponse;
  author: AuthorResponse;
  tags: TagResponse[];
  scheduledAt?: ISODateString;
  publishedAt?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface ArticleVersionResponse {
  id: UUID;
  articleId: UUID;
  version: number;
  tituloPt: string;
  corpoPt: string;
  changeSummary?: string;
  createdBy: string;
  createdAt: ISODateString;
}

export interface EditorialCommentResponse {
  id: UUID;
  articleId: UUID;
  authorName: string;
  conteudo: string;
  tipo: string;
  parentId?: UUID;
  resolved: boolean;
  createdAt: ISODateString;
}

export interface ShareLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  whatsapp: string;
  telegram: string;
  email: string;
}

export interface NewsletterSubscribeRequest {
  email: string;
  nome?: string;
  idioma?: string;
}

export interface MediaFileResponse {
  id: UUID;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
  createdAt: ISODateString;
}

export interface PagedData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  timestamp?: string;
}
