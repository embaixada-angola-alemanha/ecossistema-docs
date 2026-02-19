// SI API Models — Generated types (stubs until OpenAPI generation)

export type UUID = string;
export type ISODateString = string;

export type EstadoPagina = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type TipoPagina = 'STATIC' | 'BLOG' | 'NEWS' | 'LANDING';
export type EstadoEvento = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'ARCHIVED';
export type TipoMenu = 'HEADER' | 'FOOTER' | 'SIDEBAR';

export interface PageTranslation {
  idioma: 'PT' | 'EN' | 'DE' | 'CS';
  titulo: string;
  conteudo: string;
  excerto: string;
}

export interface PageResponse {
  id: UUID;
  slug: string;
  tipo: TipoPagina;
  estado: EstadoPagina;
  template?: string;
  imagemDestaqueUrl?: string;
  ordem: number;
  translations: PageTranslation[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface EventResponse {
  id: UUID;
  slug: string;
  tituloPt: string;
  tituloEn?: string;
  tituloDe?: string;
  descricaoPt: string;
  descricaoEn?: string;
  descricaoDe?: string;
  localPt: string;
  localEn?: string;
  localDe?: string;
  dataInicio: ISODateString;
  dataFim?: ISODateString;
  horaInicio?: string;
  horaFim?: string;
  imagemUrl?: string;
  estado: EstadoEvento;
  destaque: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface MenuItemResponse {
  id: UUID;
  label: string;
  url?: string;
  routerLink?: string;
  icon?: string;
  ordem: number;
  parentId?: UUID;
  children?: MenuItemResponse[];
}

export interface MenuResponse {
  id: UUID;
  tipo: TipoMenu;
  items: MenuItemResponse[];
}

export interface ContactResponse {
  id: UUID;
  tipo: string;
  valor: string;
  labelPt: string;
  labelEn?: string;
  labelDe?: string;
  icon?: string;
  ordem: number;
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
