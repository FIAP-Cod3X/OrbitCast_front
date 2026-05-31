import { useState, useEffect } from 'react';
import { Radio, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  Button, Card, Input, Select, Textarea, Modal, Loading, ErrorMessage,
  StatusBadge, SectionHeader, EmptyState
} from '../components/ui';
import { campanhasApi, clientesApi, canaisApi } from '../services/api';
import type { CampanhaTransmissao, CampanhaFormData, Cliente, Canal, QualidadeDesejada, StatusCampanha } from '../types';
import { useToast } from '../context/ToastContext';

const defaultForm: CampanhaFormData = {
  clienteId: 0, canalId: 0, nome: '', descricao: '',
  dataInicio: '', dataFim: '', duracaoHoras: 1,
  qualidadeDesejada: 'HD', orcamento: 0, status: 'PLANEJADA',
};

const qualOptions = [
  { value: 'SD', label: 'SD - Standard Definition' },
  { value: 'HD', label: 'HD - High Definition' },
  { value: 'FULL_HD', label: 'Full HD - 1080p' },
  { value: '4K', label: '4K - Ultra HD' },
];

const statusOptions = [
  { value: 'PLANEJADA', label: 'Planejada' },
  { value: 'EM_ANALISE', label: 'Em Análise' },
  { value: 'APROVADA', label: 'Aprovada' },
  { value: 'CANCELADA', label: 'Cancelada' },
  { value: 'FINALIZADA', label: 'Finalizada' },
];

export default function CampanhasPage() {
  const { addToast } = useToast();
  const [campanhas, setCampanhas] = useState<CampanhaTransmissao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [canais, setCanais] = useState<Canal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CampanhaFormData>(defaultForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true); setError(null);
    try {
      const [c, cl, ca] = await Promise.all([
        campanhasApi.getAll(),
        clientesApi.getAll(),
        canaisApi.getAll(),
      ]);
      setCampanhas(c);
      setClientes(cl);
      setCanais(ca);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const openCreate = () => {
    setForm(defaultForm);
    setEditId(null);
    setModalOpen(true);
  };

  const openEdit = (c: CampanhaTransmissao) => {
    setForm({
      clienteId: c.clienteId, canalId: c.canalId, nome: c.nome,
      descricao: c.descricao, dataInicio: c.dataInicio, dataFim: c.dataFim,
      duracaoHoras: c.duracaoHoras, qualidadeDesejada: c.qualidadeDesejada,
      orcamento: c.orcamento, status: c.status,
    });
    setEditId(c.id);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nome.trim()) { addToast('Nome obrigatório', 'error'); return; }
    if (!form.clienteId) { addToast('Selecione um cliente', 'error'); return; }
    setSaving(true);
    try {
      if (editId) {
        await campanhasApi.update(editId, form);
        addToast('Campanha atualizada!', 'success');
      } else {
        await campanhasApi.create(form);
        addToast('Campanha criada!', 'success');
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
      await campanhasApi.delete(deleteId);
      addToast('Campanha excluída', 'success');
      setDeleteId(null);
      loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro ao excluir', 'error');
    }
  };

  const filtered = campanhas.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="animate-fadeIn space-y-6">
        <SectionHeader
          title="Campanhas de Transmissão"
          subtitle="Gerencie suas campanhas de transmissão via satélite"
          icon={<Radio size={22} />}
          action={
            <Button icon={<Plus size={16} />} onClick={openCreate}>
              Nova Campanha
            </Button>
          }
        />

        {/* Search */}
        <Input
          placeholder="Buscar campanhas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-md"
        />

        {loading && <Loading message="Carregando campanhas..." />}
        {error && <ErrorMessage message={error} onRetry={loadData} />}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <EmptyState
                icon={<Radio size={48} />}
                title="Nenhuma campanha encontrada"
                message="Crie sua primeira campanha de transmissão via satélite."
                action={<Button icon={<Plus size={16} />} onClick={openCreate}>Criar Campanha</Button>}
              />
            ) : (
              <div className="grid gap-4">
                {filtered.map(c => (
                  <Card key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <Link to={`/campanhas/${c.id}`} className="font-orbitron text-base text-white hover:text-cyan-400 transition-colors font-bold">
                          {c.nome}
                        </Link>
                        <StatusBadge status={c.status} />
                        <span className="badge bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                          {c.qualidadeDesejada}
                        </span>
                      </div>
                      {c.descricao && (
                        <p className="text-slate-400 text-sm font-rajdhani line-clamp-1">{c.descricao}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-2 text-sm font-rajdhani text-slate-500">
                        <span>📅 {c.dataInicio} → {c.dataFim}</span>
                        <span>⏱ {c.duracaoHoras}h</span>
                        <span className="text-cyan-400 font-semibold">
                          R$ {Number(c.orcamento).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/campanhas/${c.id}`}>
                        <Button variant="ghost" size="sm" icon={<Eye size={14} />}>Ver</Button>
                      </Link>
                      <Button variant="ghost" size="sm" icon={<Pencil size={14} />} onClick={() => openEdit(c)}>
                        Editar
                      </Button>
                      <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => setDeleteId(c.id)}>
                        Excluir
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Create/Edit modal */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editId ? 'Editar Campanha' : 'Nova Campanha'}
          size="lg"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nome da Campanha *" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Aulas via Satélite" />
            <Select
              label="Cliente *"
              value={form.clienteId}
              onChange={e => setForm({ ...form, clienteId: Number(e.target.value) })}
              options={clientes.map(c => ({ value: c.id, label: c.nome }))}
              placeholder="Selecione o cliente"
            />
            <Select
              label="Canal"
              value={form.canalId}
              onChange={e => setForm({ ...form, canalId: Number(e.target.value) })}
              options={canais.map(c => ({ value: c.id, label: c.nome }))}
              placeholder="Selecione o canal"
            />
            <Select
              label="Qualidade Desejada"
              value={form.qualidadeDesejada}
              onChange={e => setForm({ ...form, qualidadeDesejada: e.target.value as QualidadeDesejada })}
              options={qualOptions}
            />
            <Input label="Data Início" type="date" value={form.dataInicio} onChange={e => setForm({ ...form, dataInicio: e.target.value })} />
            <Input label="Data Fim" type="date" value={form.dataFim} onChange={e => setForm({ ...form, dataFim: e.target.value })} />
            <Input
              label="Duração (horas)"
              type="number" min={1}
              value={form.duracaoHoras}
              onChange={e => setForm({ ...form, duracaoHoras: Number(e.target.value) })}
            />
            <Input
              label="Orçamento (R$)"
              type="number" min={0}
              value={form.orcamento}
              onChange={e => setForm({ ...form, orcamento: Number(e.target.value) })}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value as StatusCampanha })}
              options={statusOptions}
            />
            <div className="sm:col-span-2">
              <Textarea label="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Descreva o objetivo da campanha..." rows={3} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button loading={saving} onClick={handleSave}>
              {editId ? 'Atualizar' : 'Criar Campanha'}
            </Button>
          </div>
        </Modal>

        {/* Delete confirm */}
        <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirmar Exclusão" size="sm">
          <p className="text-slate-300 font-rajdhani mb-6">Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
