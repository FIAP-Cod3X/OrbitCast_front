import type {
  Cliente, Canal, Regiao, CampanhaTransmissao,
  Simulacao, PlanoCobertura, DashboardResumo,
  CampanhaFormData, RegiaoFormData, CampanhaRegiaoInput
} from '../types';

const DEFAULT_API_URL = import.meta.env.PROD
  ? 'https://orbitcast-global-api.onrender.com'
  : 'http://localhost:8080';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL)
  .replace(/\/+$/, '');

// Generic fetch helper
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;
  const headers = new Headers(options?.headers);
  if (options?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      `Não foi possível conectar com a API em ${API_BASE_URL}. ` +
      'Confira se a URL VITE_API_URL está correta e se a API está online.'
    );
  }

  if (!response.ok) {
    let errorMsg = `Erro ${response.status}: ${response.statusText}`;
    try {
      const errData = await response.json();
      errorMsg = errData.mensagem || errData.erro || errorMsg;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMsg);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text() as Promise<T>;
}

// ===================== HEALTH =====================
export const healthApi = {
  check: () => apiFetch<string>('/health'),
};

// ===================== CLIENTES =====================
export const clientesApi = {
  getAll: () => apiFetch<Cliente[]>('/clientes'),
  getById: (id: number) => apiFetch<Cliente>(`/clientes/${id}`),
  create: (data: Omit<Cliente, 'id'>) =>
    apiFetch<Cliente>('/clientes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Cliente>) =>
    apiFetch<Cliente>(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/clientes/${id}`, { method: 'DELETE' }),
};

// ===================== CANAIS =====================
export const canaisApi = {
  getAll: () => apiFetch<Canal[]>('/canais'),
  getById: (id: number) => apiFetch<Canal>(`/canais/${id}`),
  create: (data: Omit<Canal, 'id'>) =>
    apiFetch<Canal>('/canais', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Canal>) =>
    apiFetch<Canal>(`/canais/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/canais/${id}`, { method: 'DELETE' }),
};

// ===================== REGIOES =====================
export const regioesApi = {
  getAll: () => apiFetch<Regiao[]>('/regioes'),
  getById: (id: number) => apiFetch<Regiao>(`/regioes/${id}`),
  create: (data: RegiaoFormData) =>
    apiFetch<Regiao>('/regioes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<RegiaoFormData>) =>
    apiFetch<Regiao>(`/regioes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/regioes/${id}`, { method: 'DELETE' }),
};

// ===================== CAMPANHAS =====================
export const campanhasApi = {
  getAll: () => apiFetch<CampanhaTransmissao[]>('/campanhas'),
  getById: (id: number) => apiFetch<CampanhaTransmissao>(`/campanhas/${id}`),
  create: (data: CampanhaFormData) =>
    apiFetch<CampanhaTransmissao>('/campanhas', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<CampanhaFormData>) =>
    apiFetch<CampanhaTransmissao>(`/campanhas/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/campanhas/${id}`, { method: 'DELETE' }),

  // Regiões da campanha
  getRegioes: (campanhaId: number) =>
    apiFetch<Regiao[]>(`/campanhas/${campanhaId}/regioes`),
  addRegiao: (campanhaId: number, regiaoId: number, data: CampanhaRegiaoInput) =>
    apiFetch<void>(`/campanhas/${campanhaId}/regioes/${regiaoId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  removeRegiao: (campanhaId: number, regiaoId: number) =>
    apiFetch<void>(`/campanhas/${campanhaId}/regioes/${regiaoId}`, { method: 'DELETE' }),

  // Simulações da campanha
  getSimulacoes: (campanhaId: number) =>
    apiFetch<Simulacao[]>(`/campanhas/${campanhaId}/simulacoes`),
  runSimulacao: (campanhaId: number) =>
    apiFetch<Simulacao>(`/campanhas/${campanhaId}/simulacoes`, { method: 'POST' }),

  // Planos de cobertura
  getPlanos: (campanhaId: number) =>
    apiFetch<PlanoCobertura[]>(`/campanhas/${campanhaId}/planos-cobertura`),
};

// ===================== PLANOS DE COBERTURA =====================
export const planosApi = {
  getAll: () => apiFetch<PlanoCobertura[]>('/planos-cobertura'),
  getById: (id: number) => apiFetch<PlanoCobertura>(`/planos-cobertura/${id}`),
  create: (data: Omit<PlanoCobertura, 'id'>) =>
    apiFetch<PlanoCobertura>('/planos-cobertura', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<PlanoCobertura>) =>
    apiFetch<PlanoCobertura>(`/planos-cobertura/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/planos-cobertura/${id}`, { method: 'DELETE' }),
};

// ===================== SIMULACOES =====================
export const simulacoesApi = {
  getAll: () => apiFetch<Simulacao[]>('/simulacoes'),
  getById: (id: number) => apiFetch<Simulacao>(`/simulacoes/${id}`),
};

// ===================== DASHBOARD =====================
export const dashboardApi = {
  getResumo: () => apiFetch<DashboardResumo>('/dashboard/resumo'),
};
