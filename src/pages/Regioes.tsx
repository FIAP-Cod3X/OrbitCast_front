import { useState, useEffect } from 'react';
import { MapPin, Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  Button, Input, Select, Modal, Loading, ErrorMessage,
  EmptyState, SectionHeader
} from '../components/ui';
import { regioesApi } from '../services/api';
import type { Regiao, RegiaoFormData } from '../types';
import { useToast } from '../context/ToastContext';
import { useDebounce } from '../hooks';

const defaultForm: RegiaoFormData = {
  nome: '', estado: '', pais: 'Brasil',
  populacaoEstimada: 0, indiceConectividade: 0,
  latitude: 0, longitude: 0, areaKm2: 0, prioridadeSocial: 1,
};

const estados = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
].map(e => ({ value: e, label: e }));

function prioridadeLabel(p: number) {
  if (p >= 5) return { label: 'Crítica', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
  if (p >= 4) return { label: 'Alta', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' };
  if (p >= 3) return { label: 'Média', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
  return { label: 'Baixa', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' };
}

function conectividade(idx: number) {
  const v = Number(idx);
  if (v < 25) return { label: 'Muito Baixa', color: 'text-red-400', width: v };
  if (v < 50) return { label: 'Baixa', color: 'text-orange-400', width: v };
  if (v < 75) return { label: 'Média', color: 'text-yellow-400', width: v };
  return { label: 'Alta', color: 'text-emerald-400', width: v };
}

export default function RegioesPage() {
  const { addToast } = useToast();
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<RegiaoFormData>(defaultForm);
  const [saving, setSaving] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const loadData = async () => {
    setLoading(true); setError(null);
    try {
      const data = await regioesApi.getAll();
      setRegioes(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar regiões');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const openCreate = () => { setForm(defaultForm); setEditId(null); setModalOpen(true); };
  const openEdit = (r: Regiao) => {
    setForm({
      nome: r.nome, estado: r.estado, pais: r.pais,
      populacaoEstimada: r.populacaoEstimada, indiceConectividade: Number(r.indiceConectividade),
      latitude: Number(r.latitude), longitude: Number(r.longitude),
      areaKm2: Number(r.areaKm2), prioridadeSocial: r.prioridadeSocial,
    });
    setEditId(r.id);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nome.trim()) { addToast('Nome obrigatório', 'error'); return; }
    setSaving(true);
    try {
      if (editId) {
        await regioesApi.update(editId, form);
        addToast('Região atualizada!', 'success');
      } else {
        await regioesApi.create(form);
        addToast('Região criada!', 'success');
      }
      setModalOpen(false);
      loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro ao salvar', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await regioesApi.delete(deleteId);
      addToast('Região excluída', 'success');
      setDeleteId(null);
      loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro ao excluir', 'error');
    }
  };

  const filtered = regioes.filter(r => {
    const matchSearch = r.nome.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      r.estado.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchEstado = !filterEstado || r.estado === filterEstado;
    const matchPriority = !filterPriority || r.prioridadeSocial >= Number(filterPriority);
    return matchSearch && matchEstado && matchPriority;
  });

  return (
    <DashboardLayout>
      <div className="animate-fadeIn space-y-6">
        <SectionHeader
          title="Regiões de Cobertura"
          subtitle="Mapeamento de áreas para transmissão via satélite"
          icon={<MapPin size={22} />}
          action={<Button icon={<Plus size={16} />} onClick={openCreate}>Nova Região</Button>}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nome ou estado..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-navy-border bg-[#0d1f3cb3] py-2.5 pl-9 pr-4 font-rajdhani text-slate-100 placeholder-slate-500 transition-all focus:border-cyan-500/70 focus:outline-none"
            />
          </div>
          <select
            value={filterEstado}
            onChange={e => setFilterEstado(e.target.value)}
            className="cursor-pointer rounded-xl border border-navy-border bg-[#0d1f3cb3] px-4 py-2.5 font-rajdhani text-slate-100 focus:border-cyan-500/70 focus:outline-none"
          >
            <option value="">Todos os estados</option>
            {estados.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
          </select>
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="cursor-pointer rounded-xl border border-navy-border bg-[#0d1f3cb3] px-4 py-2.5 font-rajdhani text-slate-100 focus:border-cyan-500/70 focus:outline-none"
          >
            <option value="">Qualquer prioridade</option>
            <option value="5">Crítica (5)</option>
            <option value="4">Alta+ (≥4)</option>
            <option value="3">Média+ (≥3)</option>
          </select>
          {(search || filterEstado || filterPriority) && (
            <Button variant="ghost" size="sm" icon={<Filter size={14} />} onClick={() => { setSearch(''); setFilterEstado(''); setFilterPriority(''); }}>
              Limpar
            </Button>
          )}
        </div>

        <div className="text-sm text-slate-500 font-rajdhani">
          {filtered.length} de {regioes.length} regiões
        </div>

        {loading && <Loading message="Carregando regiões..." />}
        {error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && (
          filtered.length === 0 ? (
            <EmptyState
              icon={<MapPin size={48} />}
              title="Nenhuma região encontrada"
              message="Cadastre regiões para planejar suas transmissões."
              action={<Button icon={<Plus size={16} />} onClick={openCreate}>Cadastrar Região</Button>}
            />
          ) : (
            <div className="glass rounded-2xl border border-navy-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-navy-border bg-navy-card/50">
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">REGIÃO</th>
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">ESTADO</th>
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">POPULAÇÃO</th>
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">CONECTIVIDADE</th>
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">PRIORIDADE</th>
                      <th className="text-left px-4 py-3 text-xs font-orbitron text-slate-500">ÁREA</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(r => {
                      const conn = conectividade(Number(r.indiceConectividade));
                      const prio = prioridadeLabel(r.prioridadeSocial);
                      return (
                        <tr key={r.id} className="border-b border-navy-border/40 hover:bg-white/2 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-rajdhani font-semibold text-slate-200">{r.nome}</div>
                            <div className="text-xs text-slate-500">{r.pais}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="badge bg-blue-500/10 border border-blue-500/20 text-blue-400">{r.estado}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-300 font-rajdhani text-sm">
                            {Number(r.populacaoEstimada).toLocaleString('pt-BR')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1.5 bg-navy-border rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all"
                                  style={{ width: `${Math.min(100, conn.width)}%` }}
                                />
                              </div>
                              <span className={`text-xs font-rajdhani ${conn.color}`}>
                                {Number(r.indiceConectividade).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge border text-xs ${prio.color}`}>
                              {prio.label} ({r.prioridadeSocial})
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 font-rajdhani text-sm">
                            {Number(r.areaKm2).toLocaleString('pt-BR')} km²
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="sm" icon={<Pencil size={12} />} onClick={() => openEdit(r)} />
                              <Button variant="danger" size="sm" icon={<Trash2 size={12} />} onClick={() => setDeleteId(r.id)} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editId ? 'Editar Região' : 'Nova Região'} size="lg">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nome *" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Comunidade Ribeirinha Norte" />
            <Select
              label="Estado *"
              value={form.estado}
              onChange={e => setForm({ ...form, estado: e.target.value })}
              options={estados}
              placeholder="Selecione"
            />
            <Input label="País" value={form.pais} onChange={e => setForm({ ...form, pais: e.target.value })} />
            <Input
              label="População Estimada"
              type="number" min={0}
              value={form.populacaoEstimada}
              onChange={e => setForm({ ...form, populacaoEstimada: Number(e.target.value) })}
            />
            <Input
              label="Índice de Conectividade (%)"
              type="number" min={0} max={100} step={0.1}
              value={form.indiceConectividade}
              onChange={e => setForm({ ...form, indiceConectividade: Number(e.target.value) })}
            />
            <Input
              label="Área (km²)"
              type="number" min={0}
              value={form.areaKm2}
              onChange={e => setForm({ ...form, areaKm2: Number(e.target.value) })}
            />
            <Input
              label="Latitude"
              type="number" step={0.0001}
              value={form.latitude}
              onChange={e => setForm({ ...form, latitude: Number(e.target.value) })}
            />
            <Input
              label="Longitude"
              type="number" step={0.0001}
              value={form.longitude}
              onChange={e => setForm({ ...form, longitude: Number(e.target.value) })}
            />
            <Select
              label="Prioridade Social (1–5)"
              value={form.prioridadeSocial}
              onChange={e => setForm({ ...form, prioridadeSocial: Number(e.target.value) })}
              options={[1,2,3,4,5].map(n => ({ value: n, label: `${n} - ${['Baixa','Regular','Média','Alta','Crítica'][n-1]}` }))}
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button loading={saving} onClick={handleSave}>{editId ? 'Atualizar' : 'Criar Região'}</Button>
          </div>
        </Modal>

        {/* Delete confirm */}
        <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar Exclusão" size="sm">
          <p className="text-slate-300 font-rajdhani mb-6">Tem certeza que deseja excluir esta região?</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
