// GPJ API Models — Generated types (stubs until OpenAPI generation)

export type UUID = string;
export type ISODateString = string;

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'BLOCKED' | 'CANCELLED';
export type TaskPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type SprintStatus = 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type MilestoneStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'MISSED';
export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export interface ProjectResponse {
  id: UUID;
  nome: string;
  descricao?: string;
  estado: ProjectStatus;
  dataInicio: ISODateString;
  dataFimPrevista?: ISODateString;
  progresso: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface SprintResponse {
  id: UUID;
  projectId: UUID;
  nome: string;
  numero: number;
  objetivo?: string;
  estado: SprintStatus;
  dataInicio: ISODateString;
  dataFim: ISODateString;
  totalTarefas: number;
  tarefasConcluidas: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TaskResponse {
  id: UUID;
  sprintId: UUID;
  projectId: UUID;
  titulo: string;
  descricao?: string;
  estado: TaskStatus;
  prioridade: TaskPriority;
  assignee?: string;
  horasEstimadas?: number;
  horasReais?: number;
  tags: string[];
  dependencias: UUID[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TaskCreateRequest {
  sprintId: UUID;
  titulo: string;
  descricao?: string;
  prioridade?: TaskPriority;
  assignee?: string;
  horasEstimadas?: number;
  tags?: string[];
}

export interface MilestoneResponse {
  id: UUID;
  projectId: UUID;
  nome: string;
  descricao?: string;
  estado: MilestoneStatus;
  dataAlvo: ISODateString;
  dataConclusao?: ISODateString;
  createdAt: ISODateString;
}

export interface TimeLogResponse {
  id: UUID;
  taskId: UUID;
  userId: string;
  horas: number;
  descricao?: string;
  data: ISODateString;
  createdAt: ISODateString;
}

export interface DashboardResumo {
  totalProjectos: number;
  totalSprints: number;
  totalTarefas: number;
  tarefasConcluidas: number;
  tarefasEmProgresso: number;
  horasTotais: number;
  horasConsumidas: number;
  progressoGeral: number;
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
