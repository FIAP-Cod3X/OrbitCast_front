// ===================== ENTITY TYPES =====================

export interface Cliente {
  id: number;
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  segmento: string;
  ativo: boolean;
}

export interface Canal {
  id: number;
  clienteId: number;
  nome: string;
  tipoConteudo: string;
  publicoAlvo: string;
  classificacaoIndicativa: string;
  ativo: boolean;
}

export interface Regiao {
  id: number;
  nome: string;
  estado: string;
  pais: string;
  populacaoEstimada: number;
  indiceConectividade: number;
  latitude: number;
  longitude: number;
  areaKm2: number;
  prioridadeSocial: number;
}

export type QualidadeDesejada = 'SD' | 'HD' | 'FULL_HD' | '4K';
export type StatusCampanha = 'PLANEJADA' | 'EM_ANALISE' | 'APROVADA' | 'CANCELADA' | 'FINALIZADA';
export type ViabilidadeTipo = 'ALTA' | 'MEDIA' | 'BAIXA';

export interface CampanhaTransmissao {
  id: number;
  clienteId: number;
  canalId: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  duracaoHoras: number;
  qualidadeDesejada: QualidadeDesejada;
  orcamento: number;
  status: StatusCampanha;
}

export interface CampanhaRegiaoInput {
  prioridade: number;
  observacao: string;
}

export interface Simulacao {
  id: number;
  campanhaId: number;
  custoEstimado: number;
  alcanceEstimado: number;
  qualidadeSinal: number;
  viabilidade: ViabilidadeTipo;
  recomendacao: string;
  dataSimulacao: string;
}

export interface PlanoCobertura {
  id: number;
  campanhaId: number;
  nome: string;
  descricao: string;
  custoTotal: number;
  alcanceTotal: number;
  viabilidadeGeral: ViabilidadeTipo;
}

export interface DashboardResumo {
  totalClientes: number;
  totalCanais: number;
  totalRegioes: number;
  totalCampanhas: number;
  totalSimulacoes: number;
  alcanceEstimadoTotal: number;
  custoMedioSimulacoes: number;
  qualidadeMediaSinal: number;
  campanhasPorStatus: Record<StatusCampanha, number>;
  simulacoesPorViabilidade: Record<ViabilidadeTipo, number>;
}

// ===================== API RESPONSE TYPES =====================

export interface ApiError {
  status: number;
  erro: string;
  mensagem: string;
  timestamp: string;
}

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

// ===================== FORM TYPES =====================

export interface CampanhaFormData {
  clienteId: number;
  canalId: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  duracaoHoras: number;
  qualidadeDesejada: QualidadeDesejada;
  orcamento: number;
  status: StatusCampanha;
}

export interface RegiaoFormData {
  nome: string;
  estado: string;
  pais: string;
  populacaoEstimada: number;
  indiceConectividade: number;
  latitude: number;
  longitude: number;
  areaKm2: number;
  prioridadeSocial: number;
}

// ===================== UI TYPES =====================

export type SidebarItem = {
  label: string;
  path: string;
  icon: string;
};

export interface IntegranteType {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  role: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

// ===================== UNION & INTERSECTION TYPES =====================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type StatusColor = {
  PLANEJADA: 'blue';
  EM_ANALISE: 'yellow';
  APROVADA: 'green';
  CANCELADA: 'red';
  FINALIZADA: 'gray';
};

export type FilterableRegiao = Regiao & {
  filtered?: boolean;
  highlighted?: boolean;
};

export type CampanhaComSimulacao = CampanhaTransmissao & {
  ultimaSimulacao?: Simulacao;
  totalRegioes?: number;
};
