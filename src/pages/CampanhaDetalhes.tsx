import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Radio, MapPin, Zap, Brain, Calendar, Clock, DollarSign, Activity
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button, Card, Loading, ErrorMessage, StatusBadge, ViabilidadeBadge, ScoreRing, Select, Input } from '../components/ui';
import { campanhasApi, regioesApi } from '../services/api';
import type { CampanhaTransmissao, Regiao, Simulacao, PlanoCobertura } from '../types';
import { useToast } from '../context/useToast';

type ChartPayload = { value?: string | number };
type ChartTooltipProps = { active?: boolean; payload?: ChartPayload[]; label?: string | number };

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload?.length) {
    return (
      <div className="glass px-3 py-2 rounded-lg border border-navy-border text-sm font-rajdhani">
        <p className="text-slate-300">{label}</p>
        <p className="text-cyan-400 font-semibold">{payload[0]?.value}</p>
      </div>
    );
  }
  return null;
};

export default function CampanhaDetalhes() {
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();

  const [campanha, setCampanha] = useState<CampanhaTransmissao | null>(null);
  const [todasRegioes, setTodasRegioes] = useState<Regiao[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [planos, setPlanos] = useState<PlanoCobertura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simLoading, setSimLoading] = useState(false);
  const [selectedRegiaoId, setSelectedRegiaoId] = useState('');
  const [prioridadeRegiao, setPrioridadeRegiao] = useState(3);
  const [observacaoRegiao, setObservacaoRegiao] = useState('');
  const [savingRegiao, setSavingRegiao] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true); setError(null);
    try {
      const numId = Number(id);
      const [c, r, s, p, all] = await Promise.all([
        campanhasApi.getById(numId),
        campanhasApi.getRegioes(numId).catch(() => []),
        campanhasApi.getSimulacoes(numId).catch(() => []),
        campanhasApi.getPlanos(numId).catch(() => []),
        regioesApi.getAll().catch(() => []),
      ]);
      setCampanha(c);
      setRegioes(r);
      setSimulacoes(s);
      setPlanos(p);
      setTodasRegioes(all);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Campanha não encontrada');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

  const runSimulacao = async () => {
    if (!id) return;
    setSimLoading(true);
    try {
      const sim = await campanhasApi.runSimulacao(Number(id));
      setSimulacoes(prev => [sim, ...prev]);
      addToast('Simulação executada com sucesso!', 'success');
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro na simulação', 'error');
    } finally {
      setSimLoading(false);
    }
  };

  const addRegiao = async () => {
    if (!id) return;
    if (!selectedRegiaoId) {
      addToast('Selecione uma região para associar', 'warning');
      return;
    }

    setSavingRegiao(true);
    try {
      await campanhasApi.addRegiao(Number(id), Number(selectedRegiaoId), {
        prioridade: prioridadeRegiao,
        observacao: observacaoRegiao.trim(),
      });
      addToast('Região associada à campanha', 'success');
      setSelectedRegiaoId('');
      setPrioridadeRegiao(3);
      setObservacaoRegiao('');
      await loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro ao associar região', 'error');
    } finally {
      setSavingRegiao(false);
    }
  };

  const removeRegiao = async (regiaoId: number) => {
    if (!id) return;
    setSavingRegiao(true);
    try {
      await campanhasApi.removeRegiao(Number(id), regiaoId);
      addToast('Região removida da campanha', 'success');
      await loadData();
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro ao remover região', 'error');
    } finally {
      setSavingRegiao(false);
    }
  };

  const simChartData = simulacoes.slice(0, 8).reverse().map((s, i) => ({
    name: `#${i + 1}`,
    custo: Number(s.custoEstimado) / 1000,
    alcance: Number(s.alcanceEstimado) / 1000,
    qualidade: Number(s.qualidadeSinal),
  }));

  const ultimaSim = simulacoes[0];
  const regioesDisponiveis = todasRegioes.filter(r => !regioes.some(associada => associada.id === r.id));

  if (loading) return <DashboardLayout><Loading message="Carregando campanha..." /></DashboardLayout>;
  if (error || !campanha) return (
    <DashboardLayout>
      <ErrorMessage message={error ?? 'Campanha não encontrada'} />
      <div className="mt-4">
        <Link to="/campanhas">
          <Button variant="ghost" icon={<ArrowLeft size={16} />}>Voltar para Campanhas</Button>
        </Link>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="animate-fadeIn space-y-6">
        {/* Back + header */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link to="/campanhas">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>Voltar</Button>
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <Radio size={22} className="text-cyan-400" />
            <h1 className="font-orbitron text-xl font-bold text-white">{campanha.nome}</h1>
            <StatusBadge status={campanha.status} />
            <span className="badge bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {campanha.qualidadeDesejada}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              icon={<Zap size={16} />}
              loading={simLoading}
              onClick={runSimulacao}
              disabled={regioes.length === 0}
            >
              {regioes.length === 0 ? 'Adicione regiões primeiro' : 'Executar Simulação'}
            </Button>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center gap-3">
            <Calendar size={20} className="text-cyan-400" />
            <div>
              <div className="text-xs text-slate-500 font-rajdhani">Período</div>
              <div className="text-sm text-slate-200 font-rajdhani font-semibold">{campanha.dataInicio} → {campanha.dataFim}</div>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <Clock size={20} className="text-blue-400" />
            <div>
              <div className="text-xs text-slate-500 font-rajdhani">Duração</div>
              <div className="text-sm text-slate-200 font-rajdhani font-semibold">{campanha.duracaoHoras} horas</div>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <DollarSign size={20} className="text-emerald-400" />
            <div>
              <div className="text-xs text-slate-500 font-rajdhani">Orçamento</div>
              <div className="text-sm text-emerald-400 font-rajdhani font-bold">
                R$ {Number(campanha.orcamento).toLocaleString('pt-BR')}
              </div>
            </div>
          </Card>
          <Card className="flex items-center gap-3">
            <MapPin size={20} className="text-purple-400" />
            <div>
              <div className="text-xs text-slate-500 font-rajdhani">Regiões</div>
              <div className="text-sm text-slate-200 font-rajdhani font-semibold">{regioes.length} regiões</div>
            </div>
          </Card>
        </div>

        {campanha.descricao && (
          <Card>
            <p className="text-slate-300 font-rajdhani">{campanha.descricao}</p>
          </Card>
        )}

        {/* Última simulação */}
        {ultimaSim && (
          <Card className="border border-cyan-500/20">
            <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
              <Zap size={16} className="text-yellow-400" />
              Última Simulação
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <ScoreRing score={Number(ultimaSim.qualidadeSinal)} size={90} />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-rajdhani text-sm">Custo Estimado:</span>
                  <span className="text-cyan-400 font-orbitron font-bold">R$ {Number(ultimaSim.custoEstimado).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-rajdhani text-sm">Alcance:</span>
                  <span className="text-emerald-400 font-orbitron font-bold">{Number(ultimaSim.alcanceEstimado).toLocaleString('pt-BR')} pessoas</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-rajdhani text-sm">Viabilidade:</span>
                  <ViabilidadeBadge viabilidade={ultimaSim.viabilidade} />
                </div>
              </div>
              {ultimaSim.recomendacao && (
                <div className="flex-1 glass rounded-xl p-4 border border-purple-500/20 max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={14} className="text-purple-400" />
                    <span className="text-xs font-orbitron text-purple-400">Recomendação IA</span>
                  </div>
                  <p className="text-slate-300 font-rajdhani text-sm leading-relaxed">{ultimaSim.recomendacao}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Charts row */}
        {simChartData.length > 1 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
                <Activity size={16} className="text-blue-400" />
                Evolução do Custo (R$ mil)
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={simChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Rajdhani' }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="custo" fill="#00d4ff" radius={[4, 4, 0, 0]} opacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                Qualidade do Sinal (%)
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={simChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Rajdhani' }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="qualidade" stroke="#00ff88" strokeWidth={2} dot={{ fill: '#00ff88', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Regiões associadas */}
        <Card>
          <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
            <h3 className="font-orbitron text-sm text-slate-300 flex items-center gap-2">
              <MapPin size={16} className="text-purple-400" />
              Regiões Associadas ({regioes.length})
            </h3>
            <span className="text-xs text-slate-500 font-rajdhani">
              {regioesDisponiveis.length} regiões disponíveis
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.45fr_1fr_auto] gap-3 mb-5 items-end">
            <Select
              label="Região"
              value={selectedRegiaoId}
              onChange={e => setSelectedRegiaoId(e.target.value)}
              options={regioesDisponiveis.map(r => ({
                value: r.id,
                label: `${r.nome} (${r.estado})`,
              }))}
              placeholder={regioesDisponiveis.length ? 'Selecione uma região' : 'Todas já associadas'}
              disabled={savingRegiao || regioesDisponiveis.length === 0}
            />
            <Input
              label="Prioridade"
              type="number"
              min={1}
              max={5}
              value={prioridadeRegiao}
              onChange={e => setPrioridadeRegiao(Number(e.target.value))}
              disabled={savingRegiao}
            />
            <Input
              label="Observação"
              value={observacaoRegiao}
              onChange={e => setObservacaoRegiao(e.target.value)}
              placeholder="Opcional"
              disabled={savingRegiao}
            />
            <Button
              size="sm"
              loading={savingRegiao}
              onClick={addRegiao}
              disabled={!selectedRegiaoId}
            >
              Associar
            </Button>
          </div>
          {regioes.length === 0 ? (
            <p className="text-slate-500 font-rajdhani text-sm text-center py-6">
              Nenhuma região associada a esta campanha ainda.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regioes.map(r => (
                <div key={r.id} className="glass rounded-xl p-3 border border-navy-border/50">
                  <div className="font-rajdhani font-semibold text-slate-200">{r.nome}</div>
                  <div className="text-xs text-slate-500 font-rajdhani">{r.estado} · {r.pais}</div>
                  <div className="flex justify-between mt-2 text-xs font-rajdhani">
                    <span className="text-slate-400">
                      👥 {Number(r.populacaoEstimada).toLocaleString('pt-BR')}
                    </span>
                    <span className="text-cyan-400">
                      📡 {r.indiceConectividade}%
                    </span>
                  </div>
                  <div className="mt-1">
                    <div className="h-1 bg-navy-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${Math.min(100, Number(r.indiceConectividade))}%` }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRegiao(r.id)}
                    disabled={savingRegiao}
                    className="mt-3"
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Planos de cobertura */}
        {planos.length > 0 && (
          <Card>
            <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
              <Radio size={16} className="text-cyan-400" />
              Planos de Cobertura ({planos.length})
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {planos.map(p => (
                <div key={p.id} className="glass rounded-xl p-4 border border-navy-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-orbitron text-sm text-white">{p.nome}</span>
                    <ViabilidadeBadge viabilidade={p.viabilidadeGeral} />
                  </div>
                  <p className="text-xs text-slate-400 font-rajdhani mb-3">{p.descricao}</p>
                  <div className="flex gap-4 text-xs font-rajdhani">
                    <span className="text-cyan-400">R$ {Number(p.custoTotal).toLocaleString('pt-BR')}</span>
                    <span className="text-emerald-400">{Number(p.alcanceTotal).toLocaleString('pt-BR')} pessoas</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Histórico simulações */}
        {simulacoes.length > 0 && (
          <Card>
            <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
              <Zap size={16} className="text-yellow-400" />
              Histórico de Simulações ({simulacoes.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-rajdhani">
                <thead>
                  <tr className="text-left text-xs text-slate-500 font-orbitron border-b border-navy-border">
                    <th className="pb-3 pr-4">#</th>
                    <th className="pb-3 pr-4">CUSTO ESTIMADO</th>
                    <th className="pb-3 pr-4">ALCANCE</th>
                    <th className="pb-3 pr-4">QUALIDADE</th>
                    <th className="pb-3 pr-4">VIABILIDADE</th>
                    <th className="pb-3">DATA</th>
                  </tr>
                </thead>
                <tbody>
                  {simulacoes.map((s, i) => (
                    <tr key={s.id} className="border-b border-navy-border/30 hover:bg-white/2 transition-colors">
                      <td className="py-2.5 pr-4 text-slate-500">{i + 1}</td>
                      <td className="py-2.5 pr-4 text-cyan-400 font-semibold">R$ {Number(s.custoEstimado).toLocaleString('pt-BR')}</td>
                      <td className="py-2.5 pr-4 text-slate-300">{Number(s.alcanceEstimado).toLocaleString('pt-BR')}</td>
                      <td className="py-2.5 pr-4 text-emerald-400">{Number(s.qualidadeSinal).toFixed(1)}%</td>
                      <td className="py-2.5 pr-4"><ViabilidadeBadge viabilidade={s.viabilidade} /></td>
                      <td className="py-2.5 text-slate-500 text-xs">{new Date(s.dataSimulacao).toLocaleString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
