import { useEffect, useState } from 'react';
import { LayoutDashboard, Radio, MapPin, Zap, TrendingUp, Activity, Users, Brain } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { MetricCard, Loading, ErrorMessage, ViabilidadeBadge, StatusBadge, ScoreRing, PageHeader } from '../components/ui';
import { dashboardApi, campanhasApi, simulacoesApi } from '../services/api';
import type { DashboardResumo, CampanhaTransmissao, Simulacao } from '../types';

const COLORS = { blue:'#4a9eff', purple:'#b794f4', green:'#68d391', yellow:'#f6ad55', red:'#fc8181' };

type ChartPayload = { name?: string; value?: string | number; color?: string };
type ChartTooltipProps = { active?: boolean; payload?: ChartPayload[]; label?: string | number };

const Tip = ({ active, payload, label }: ChartTooltipProps) => active && payload?.length ? (
  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-2.5 text-[13px]">
    <p className="mb-1 text-[var(--text-dim)]">{label}</p>
    {payload.map((p) => <p key={`${p.name}-${p.value}`} style={{ color: p.color, fontWeight:600 }}>{p.name}: {p.value}</p>)}
  </div>
) : null;

export default function DashboardPage() {
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);
  const [campanhas, setCampanhas] = useState<CampanhaTransmissao[]>([]);
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const [r, c, s] = await Promise.all([dashboardApi.getResumo(), campanhasApi.getAll(), simulacoesApi.getAll()]);
      setResumo(r); setCampanhas(c); setSimulacoes(s);
    } catch (e) { setError(e instanceof Error ? e.message : 'Erro'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  if (loading) return <DashboardLayout><Loading message="Carregando dashboard..." /></DashboardLayout>;
  if (error) return <DashboardLayout><ErrorMessage message={error} onRetry={load} /></DashboardLayout>;

  const statusData = resumo ? Object.entries(resumo.campanhasPorStatus).filter(([,v])=>v>0).map(([name,value])=>({name,value})) : [];
  const viabData = resumo ? Object.entries(resumo.simulacoesPorViabilidade).filter(([,v])=>v>0).map(([name,value])=>({name,value})) : [];
  const simChart = simulacoes.slice(-8).reverse().map((s,i)=>({
    n:`#${i+1}`, custo: +(Number(s.custoEstimado)/1000).toFixed(1), qualidade: +Number(s.qualidadeSinal).toFixed(1),
  }));
  const VIAB_COLORS: Record<string, string> = { ALTA: COLORS.green, MEDIA: COLORS.yellow, BAIXA: COLORS.red };

  return (
    <DashboardLayout>
      <div className="anim-fade-in">
        <PageHeader
          title="Dashboard"
          subtitle="Visão geral das operações OrbitCast"
          icon={<LayoutDashboard size={20} />}
          action={
            <div className="flex items-center gap-2 text-[13px] text-[var(--text-dim)]">
              <div className="h-[7px] w-[7px] rounded-full bg-[var(--success)] shadow-[0_0_6px_var(--success)]" />
              API Conectada
            </div>
          }
        />

        {/* Metrics */}
        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3">
          <div className="anim-fade-up delay-1"><MetricCard label="Clientes" value={resumo?.totalClientes ?? 0} icon={<Users size={18}/>} color="var(--accent)" /></div>
          <div className="anim-fade-up delay-2"><MetricCard label="Campanhas" value={resumo?.totalCampanhas ?? 0} icon={<Radio size={18}/>} color={COLORS.purple} /></div>
          <div className="anim-fade-up delay-3"><MetricCard label="Regiões" value={resumo?.totalRegioes ?? 0} icon={<MapPin size={18}/>} color={COLORS.green} /></div>
          <div className="anim-fade-up delay-4"><MetricCard label="Simulações" value={resumo?.totalSimulacoes ?? 0} icon={<Zap size={18}/>} color={COLORS.yellow} /></div>
          <div className="anim-fade-up delay-5"><MetricCard label="Alcance Total" value={`${((resumo?.alcanceEstimadoTotal??0)/1_000_000).toFixed(1)}M`} icon={<TrendingUp size={18}/>} color={COLORS.green} subtitle="pessoas estimadas" /></div>
          <div className="anim-fade-up delay-6"><MetricCard label="Qualidade Média" value={`${(resumo?.qualidadeMediaSinal??0).toFixed(1)}%`} icon={<Activity size={18}/>} color={COLORS.red} subtitle="do sinal" /></div>
        </div>

        {/* Charts row */}
        <div className="chart-grid mb-4 grid grid-cols-3 gap-4">
          {/* Area chart */}
          <div className="card col-span-2 p-5 anim-fade-up delay-1">
            <p className="section-title mb-4">Histórico de Simulações</p>
            {simChart.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={simChart}>
                  <defs>
                    <linearGradient id="gCusto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gQual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.15}/>
                      <stop offset="95%" stopColor={COLORS.green} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="n" tick={{fill:'var(--text-dim)', fontSize:11}} />
                  <YAxis tick={{fill:'var(--text-dim)', fontSize:11}} />
                  <Tooltip content={<Tip />} />
                  <Legend wrapperStyle={{fontSize:12,color:'var(--text-dim)'}} />
                  <Area type="monotone" dataKey="custo" name="Custo (R$K)" stroke={COLORS.blue} fill="url(#gCusto)" strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="qualidade" name="Qualidade %" stroke={COLORS.green} fill="url(#gQual)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : <div className="flex h-[200px] items-center justify-center text-sm text-[var(--text-dim)]">Sem simulações ainda</div>}
          </div>

          {/* Viabilidade pie */}
          <div className="card p-5 anim-fade-up delay-2">
            <p className="section-title mb-4">Viabilidade</p>
            {viabData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={viabData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3}>
                      {viabData.map(entry => <Cell key={entry.name} fill={VIAB_COLORS[entry.name] ?? COLORS.blue} />)}
                    </Pie>
                    <Tooltip content={<Tip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3 flex flex-col gap-2">
                  {viabData.map(v => (
                    <div key={v.name} className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-sm" style={{ background: VIAB_COLORS[v.name] }} />
                        <span className="text-[var(--text-muted)]">{v.name}</span>
                      </div>
                      <span style={{ fontWeight:600, color: VIAB_COLORS[v.name] }}>{v.value}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : <div className="flex h-[180px] items-center justify-center text-sm text-[var(--text-dim)]">Sem dados</div>}
          </div>
        </div>

        {/* Status bar chart + table */}
        <div className="bottom-grid grid grid-cols-[1fr_1.6fr] gap-4">
          {/* Status chart */}
          <div className="card p-5 anim-fade-up delay-3">
            <p className="section-title mb-4">Campanhas por Status</p>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={statusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                  <XAxis type="number" tick={{fill:'var(--text-dim)',fontSize:11}} />
                  <YAxis type="category" dataKey="name" tick={{fill:'var(--text-dim)',fontSize:11}} width={90} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="value" name="Total" radius={[0,4,4,0]}>
                    {statusData.map((_,i) => <Cell key={i} fill={Object.values(COLORS)[i % 5]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="flex h-[180px] items-center justify-center text-sm text-[var(--text-dim)]">Sem dados</div>}
          </div>

          {/* Campanhas recentes */}
          <div className="card p-5 anim-fade-up delay-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="section-title">Campanhas Recentes</p>
              <Link to="/campanhas" className="text-[13px] text-[var(--accent)] no-underline">Ver todas →</Link>
            </div>
            {campanhas.length === 0 ? (
              <p className="py-8 text-center text-sm text-[var(--text-dim)]">Nenhuma campanha ainda.</p>
            ) : (
              <table className="data-table">
                <thead><tr><th>Nome</th><th>Qualidade</th><th>Orçamento</th><th>Status</th></tr></thead>
                <tbody>
                  {campanhas.slice(0,5).map(c => (
                    <tr key={c.id}>
                      <td><Link to={`/campanhas/${c.id}`} className="font-medium text-[var(--text)] no-underline hover:text-[var(--accent)]">{c.nome}</Link></td>
                      <td className="font-mono text-xs">{c.qualidadeDesejada}</td>
                      <td className="font-mono text-xs font-semibold text-[var(--accent)]">R${(Number(c.orcamento)/1000).toFixed(0)}K</td>
                      <td><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Last simulations */}
        {simulacoes.length > 0 && (
          <div className="mt-4">
            <div className="card p-5 anim-fade-up">
              <p className="section-title mb-4">Últimas Simulações</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                {simulacoes.slice(0,4).map(s => (
                  <div key={s.id} className="rounded-[10px] border border-[var(--border)] bg-[var(--bg)] p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <ScoreRing score={Number(s.qualidadeSinal)} size={56} />
                      <div>
                        <div className="mb-1 text-xs text-[var(--text-dim)]">Campanha #{s.campanhaId}</div>
                        <div className="font-display text-[15px] font-bold text-[var(--accent)]">
                          R${(Number(s.custoEstimado)/1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-[var(--text-dim)]">
                          {(Number(s.alcanceEstimado)/1000).toFixed(0)}K pessoas
                        </div>
                      </div>
                    </div>
                    <ViabilidadeBadge viabilidade={s.viabilidade} />
                    {s.recomendacao && (
                      <p className="mt-2.5 border-t border-[var(--border)] pt-2.5 text-xs leading-normal text-[var(--text-dim)]">
                        <Brain size={10} className="mr-1 inline align-middle text-[var(--accent)]" />
                        {s.recomendacao.slice(0,100)}{s.recomendacao.length>100?'…':''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .chart-grid { grid-template-columns: 1fr !important; }
          .chart-grid > *:first-child { grid-column: span 1 !important; }
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
}
