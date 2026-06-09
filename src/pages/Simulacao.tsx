import { useState, useEffect } from 'react';
import { Zap, Brain, DollarSign, Users, Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button, Select, Input, Card, Loading, ViabilidadeBadge, ScoreRing, SectionHeader } from '../components/ui';
import { campanhasApi, regioesApi } from '../services/api';
import type { CampanhaTransmissao, Regiao, Simulacao } from '../types';
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

export default function SimulacaoPage() {
  const { addToast } = useToast();
  const [campanhas, setCampanhas] = useState<CampanhaTransmissao[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [selectedCampanha, setSelectedCampanha] = useState('');
  const [loading, setLoading] = useState(true);
  const [simLoading, setSimLoading] = useState(false);
  const [resultado, setResultado] = useState<Simulacao | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [c, r] = await Promise.all([campanhasApi.getAll(), regioesApi.getAll()]);
        setCampanhas(c);
        setRegioes(r);
      } catch {
        addToast('Erro ao carregar dados', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [addToast]);

  const handleSimular = async () => {
    if (!selectedCampanha) { addToast('Selecione uma campanha', 'warning'); return; }
    setSimLoading(true);
    setResultado(null);
    try {
      const sim = await campanhasApi.runSimulacao(Number(selectedCampanha));
      setResultado(sim);
      addToast('Simulação concluída!', 'success');
    } catch (e) {
      addToast(e instanceof Error ? e.message : 'Erro na simulação', 'error');
    } finally {
      setSimLoading(false);
    }
  };

  const campanha = campanhas.find(c => c.id === Number(selectedCampanha));

  const radarData = resultado ? [
    { subject: 'Qualidade', A: Number(resultado.qualidadeSinal) },
    { subject: 'Alcance', A: Math.min(100, Number(resultado.alcanceEstimado) / 10000) },
    { subject: 'Custo-Benef', A: resultado.viabilidade === 'ALTA' ? 90 : resultado.viabilidade === 'MEDIA' ? 60 : 30 },
    { subject: 'Cobertura', A: Math.min(100, regioes.length * 20) },
    { subject: 'Viabilidade', A: resultado.viabilidade === 'ALTA' ? 90 : resultado.viabilidade === 'MEDIA' ? 55 : 25 },
  ] : [];

  const barData = resultado ? [
    { name: 'Custo Est. (R$K)', value: Number(resultado.custoEstimado) / 1000 },
    { name: 'Alcance (K pess.)', value: Number(resultado.alcanceEstimado) / 1000 },
    { name: 'Qualidade (%)', value: Number(resultado.qualidadeSinal) },
  ] : [];

  const ViabIcon = resultado?.viabilidade === 'ALTA'
    ? CheckCircle
    : resultado?.viabilidade === 'MEDIA'
    ? AlertTriangle
    : XCircle;

  const viabColor = resultado?.viabilidade === 'ALTA'
    ? 'text-emerald-400'
    : resultado?.viabilidade === 'MEDIA'
    ? 'text-yellow-400'
    : 'text-red-400';

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-6 animate-fadeIn">
        <SectionHeader
          title="Simulador de Transmissão"
          subtitle="Calcule custo, alcance e viabilidade de campanhas via satélite"
          icon={<Zap size={22} />}
        />

        {loading ? <Loading message="Carregando dados..." /> : (
          <>
            <Card className="border border-cyan-500/15">
              <h3 className="font-orbitron text-sm text-slate-300 mb-5 flex items-center gap-2">
                <Zap size={16} className="text-cyan-400" />
                Configurar Simulação
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Select
                  label="Campanha *"
                  value={selectedCampanha}
                  onChange={e => { setSelectedCampanha(e.target.value); setResultado(null); }}
                  options={campanhas.map(c => ({ value: c.id, label: `${c.nome} (${c.qualidadeDesejada})` }))}
                  placeholder="Selecione uma campanha"
                />
                {campanha && (
                  <>
                    <Input label="Qualidade do Sinal" value={campanha.qualidadeDesejada} disabled />
                    <Input label="Orçamento" value={`R$ ${Number(campanha.orcamento).toLocaleString('pt-BR')}`} disabled />
                    <Input label="Duração" value={`${campanha.duracaoHoras} horas`} disabled />
                    <Input label="Status" value={campanha.status} disabled />
                  </>
                )}
              </div>

              {campanha && (
                <div className="mb-4 p-3 glass rounded-xl border border-navy-border/50 text-sm font-rajdhani text-slate-400">
                  <span className="text-cyan-400 font-semibold">Regiões disponíveis:</span>{' '}
                  {regioes.length} regiões mapeadas para cobertura
                </div>
              )}

              <Button
                icon={<Zap size={18} />}
                size="md"
                loading={simLoading}
                onClick={handleSimular}
                disabled={!selectedCampanha}
                className="w-full sm:w-auto"
              >
                {simLoading ? 'Simulando...' : 'Executar Simulação'}
              </Button>
            </Card>

            {simLoading && (
              <Card className="text-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="h-16 w-16 animate-spin rounded-full border-2 border-cyan-500/20 border-t-cyan-400" />
                    <Zap size={24} className="absolute inset-0 m-auto text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-orbitron text-cyan-400">Processando simulação orbital...</p>
                    <p className="text-slate-500 font-rajdhani text-sm mt-1">Calculando cobertura, custo e viabilidade</p>
                  </div>
                </div>
              </Card>
            )}

            {resultado && !simLoading && (
              <div className="space-y-6 animate-fadeInUp">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <span className="font-orbitron text-sm text-cyan-400 px-3">RESULTADOS DA SIMULAÇÃO</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="text-center border border-cyan-500/20">
                    <DollarSign size={24} className="text-cyan-400 mx-auto mb-2" />
                    <div className="font-orbitron text-xl font-bold text-cyan-400">
                      R$ {(Number(resultado.custoEstimado) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-slate-500 font-rajdhani mt-1">Custo Estimado</div>
                  </Card>
                  <Card className="text-center border border-emerald-500/20">
                    <Users size={24} className="text-emerald-400 mx-auto mb-2" />
                    <div className="font-orbitron text-xl font-bold text-emerald-400">
                      {(Number(resultado.alcanceEstimado) / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-slate-500 font-rajdhani mt-1">Pessoas Alcançadas</div>
                  </Card>
                  <Card className="text-center border border-blue-500/20">
                    <Activity size={24} className="text-blue-400 mx-auto mb-2" />
                    <div className="font-orbitron text-xl font-bold text-blue-400">
                      {Number(resultado.qualidadeSinal).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-500 font-rajdhani mt-1">Qualidade do Sinal</div>
                  </Card>
                  <Card className={`text-center border ${resultado.viabilidade === 'ALTA' ? 'border-emerald-500/20' : resultado.viabilidade === 'MEDIA' ? 'border-yellow-500/20' : 'border-red-500/20'}`}>
                    <ViabIcon size={24} className={`${viabColor} mx-auto mb-2`} />
                    <div className={`font-orbitron text-xl font-bold ${viabColor}`}>
                      {resultado.viabilidade}
                    </div>
                    <div className="text-xs text-slate-500 font-rajdhani mt-1">Viabilidade</div>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border border-purple-500/20">
                    <h3 className="font-orbitron text-sm text-slate-300 mb-4 flex items-center gap-2">
                      <Brain size={16} className="text-purple-400" />
                      Recomendação da IA
                    </h3>
                    <div className="flex items-start gap-4">
                      <ScoreRing score={Number(resultado.qualidadeSinal)} size={100} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <ViabilidadeBadge viabilidade={resultado.viabilidade} />
                        </div>
                        <p className="text-slate-300 font-rajdhani text-sm leading-relaxed">
                          {resultado.recomendacao || 'Simulação processada com base nos parâmetros da campanha e nas regiões selecionadas.'}
                        </p>
                        {resultado.viabilidade === 'BAIXA' && (
                          <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-rajdhani">
                            ⚠️ Considere reduzir a qualidade do sinal ou aumentar o orçamento.
                          </div>
                        )}
                        {resultado.viabilidade === 'ALTA' && (
                          <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-rajdhani">
                            ✅ Excelente! Esta campanha tem alta viabilidade de sucesso.
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-orbitron text-sm text-slate-300 mb-4">Análise Multidimensional</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Rajdhani' }} />
                        <Radar dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.15} strokeWidth={2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                <Card>
                  <h3 className="font-orbitron text-sm text-slate-300 mb-4">Métricas Comparativas</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Rajdhani' }} />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Rajdhani' }} width={130} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="url(#barGrad)" radius={[0, 4, 4, 0]} />
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0066ff" />
                          <stop offset="100%" stopColor="#00d4ff" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                <Card className="border border-navy-border">
                  <h3 className="font-orbitron text-sm text-slate-300 mb-4">Detalhes Técnicos</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm font-rajdhani">
                    {[
                      { label: 'ID da Simulação', value: `#${resultado.id}` },
                      { label: 'Campanha ID', value: `#${resultado.campanhaId}` },
                      { label: 'Custo por mil pessoas', value: `R$ ${resultado.alcanceEstimado > 0 ? ((Number(resultado.custoEstimado) / Number(resultado.alcanceEstimado)) * 1000).toFixed(2) : '—'}` },
                      { label: 'Qualidade do Sinal', value: `${Number(resultado.qualidadeSinal).toFixed(2)}%` },
                      { label: 'Data/Hora', value: new Date(resultado.dataSimulacao).toLocaleString('pt-BR') },
                      { label: 'Viabilidade Geral', value: resultado.viabilidade },
                    ].map(item => (
                      <div key={item.label} className="p-3 glass rounded-xl border border-navy-border/50">
                        <div className="text-slate-500 text-xs mb-1">{item.label}</div>
                        <div className="text-slate-200 font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
