// SGC API Models — Generated types (stubs until OpenAPI generation)

export type UUID = string;
export type ISODateString = string;

export type EstadoCidadao = 'ACTIVO' | 'INACTIVO' | 'SUSPENSO' | 'FALECIDO';
export type Sexo = 'MASCULINO' | 'FEMININO';
export type TipoDocumento = 'PASSAPORTE' | 'BI' | 'CEDULA' | 'TITULO_VIAGEM';
export type EstadoProcesso = 'RASCUNHO' | 'SUBMETIDO' | 'EM_ANALISE' | 'APROVADO' | 'REJEITADO' | 'CERTIFICADO_EMITIDO' | 'ENTREGUE' | 'ARQUIVADO';
export type TipoProcesso = 'REGISTO_CIVIL' | 'SERVICO_NOTARIAL' | 'VISTO';
export type EstadoVisto = 'RASCUNHO' | 'SUBMETIDO' | 'EM_ANALISE' | 'APROVADO' | 'REJEITADO' | 'EMITIDO' | 'ENTREGUE' | 'EXPIRADO' | 'CANCELADO';
export type TipoVisto = 'TURISMO' | 'NEGOCIOS' | 'TRABALHO' | 'ESTUDO' | 'TRANSITO' | 'DIPLOMATICO' | 'CORTESIA';

export interface CidadaoResponse {
  id: UUID;
  nome: string;
  apelido: string;
  dataNascimento: ISODateString;
  sexo: Sexo;
  nacionalidade: string;
  naturalidade: string;
  nifAngolano?: string;
  passaporteNumero?: string;
  email: string;
  telefone: string;
  moradaAlemanha?: string;
  cidade?: string;
  codigoPostal?: string;
  estado: EstadoCidadao;
  fotoUrl?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface CidadaoCreateRequest {
  nome: string;
  apelido: string;
  dataNascimento: string;
  sexo: Sexo;
  nacionalidade: string;
  naturalidade: string;
  nifAngolano?: string;
  passaporteNumero?: string;
  email: string;
  telefone: string;
  moradaAlemanha?: string;
  cidade?: string;
  codigoPostal?: string;
}

export interface ProcessoResponse {
  id: UUID;
  cidadaoId: UUID;
  tipo: TipoProcesso;
  estado: EstadoProcesso;
  referencia: string;
  descricao?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface DocumentoResponse {
  id: UUID;
  nome: string;
  tipo: string;
  tamanho: number;
  url: string;
  createdAt: ISODateString;
}

export interface VistoResponse {
  id: UUID;
  cidadaoId: UUID;
  tipo: TipoVisto;
  estado: EstadoVisto;
  referencia: string;
  dataEntrada?: ISODateString;
  dataSaida?: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AgendamentoResponse {
  id: UUID;
  cidadaoId: UUID;
  tipo: string;
  data: ISODateString;
  hora: string;
  estado: string;
  notas?: string;
  createdAt: ISODateString;
}

export interface NotificacaoResponse {
  id: UUID;
  destinatario: string;
  assunto: string;
  corpo: string;
  tipo: string;
  lida: boolean;
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
