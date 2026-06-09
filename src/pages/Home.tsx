import { Link } from 'react-router-dom';
import { Zap, Globe, Brain, Shield, BarChart3, Radio, ArrowRight } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';


const stats = [
  { value: '18', label: 'Regiões cadastradas' },
  { value: '6', label: 'Campanhas planejadas' },
  { value: '10', label: 'Simulações registradas' },
  { value: '6,2M', label: 'Alcance estimado total' },
];

const features = [
  { icon: <Zap size={22} />, title: 'Simulação em Tempo Real', desc: 'Calcule custo, alcance e viabilidade de transmissões por satélite instantaneamente.', color: '#f6ad55' },
  { icon: <Brain size={22} />, title: 'Recomendações de Viabilidade', desc: 'A API gera recomendações com base em custo, alcance, qualidade de sinal e regiões associadas.', color: '#b794f4' },
  { icon: <Globe size={22} />, title: 'Regiões Cadastradas', desc: 'Base com regiões brasileiras, população estimada, prioridade social e índice de conectividade.', color: '#4a9eff' },
  { icon: <Shield size={22} />, title: 'Score de Viabilidade', desc: 'Análise detalhada de custo-benefício com classificação Alta, Média ou Baixa.', color: '#68d391' },
  { icon: <BarChart3 size={22} />, title: 'Dashboard Analítico', desc: 'Métricas completas, gráficos interativos e rankings de campanhas em tempo real.', color: '#63b3ed' },
  { icon: <Radio size={22} />, title: 'Multi-qualidade', desc: 'Suporte a SD, HD, Full HD e 4K com cálculo de custo diferenciado por qualidade.', color: '#fc8181' },
];

export default function HomePage() {
  return (
    <PublicLayout>
      <section style={{
        position: 'relative', minHeight: 'calc(100vh - var(--nav-h))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>

        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #0a1628 0%, #050810 55%, #000000 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', top: '5%', left: '5%',
            width: 600, height: 400,
            background: 'radial-gradient(ellipse, rgba(74,158,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '5%',
            width: 500, height: 350,
            background: 'radial-gradient(ellipse, rgba(167,139,250,0.07) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '0%', left: '30%',
            width: 700, height: 300,
            background: 'radial-gradient(ellipse, rgba(74,158,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(60px)',
          }} />
        </div>

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
          {[
            [8,12,1.2,0.9],[15,35,0.8,0.6],[23,8,1.5,1],[31,55,0.7,0.5],[42,22,1.1,0.8],
            [55,45,0.9,0.7],[63,18,1.3,0.9],[71,72,0.8,0.6],[78,38,1.0,1],[85,15,1.4,0.8],
            [92,62,0.7,0.5],[12,78,1.1,0.7],[19,52,0.8,0.9],[28,88,1.2,0.6],[35,42,0.9,0.8],
            [47,68,1.3,1],[53,28,0.7,0.6],[60,85,1.0,0.7],[68,52,1.2,0.9],[75,20,0.8,1],
            [82,75,1.1,0.6],[89,48,0.9,0.8],[95,30,1.3,0.7],[5,65,0.8,0.9],[18,22,1.0,0.6],
            [26,75,1.2,1],[40,15,0.7,0.7],[50,90,1.1,0.8],[58,38,0.9,0.9],[66,62,1.3,0.6],
            [73,28,0.8,1],[80,82,1.0,0.7],[87,55,1.2,0.8],[94,18,0.7,0.6],[3,42,1.1,0.9],
            [11,88,0.9,0.7],[20,32,1.3,1],[30,68,0.8,0.6],[38,12,1.0,0.8],[48,50,1.2,0.9],
            [57,80,0.7,0.7],[64,25,1.1,1],[72,58,0.9,0.6],[79,42,1.3,0.8],[86,72,0.8,0.9],
            [93,35,1.0,0.7],[7,55,1.2,0.6],[16,18,0.7,1],[25,92,1.1,0.8],[33,38,0.9,0.9],
            [44,72,1.3,0.7],[52,15,0.8,0.6],[61,48,1.0,1],[69,85,1.2,0.8],[76,32,0.7,0.7],
            [83,65,1.1,0.9],[90,22,0.9,0.6],[97,78,1.3,1],[2,28,0.8,0.7],[14,62,1.0,0.8],
            [22,45,1.2,0.9],[32,82,0.7,0.6],[41,28,1.1,1],[49,58,0.9,0.7],[59,92,1.3,0.8],
            [67,35,0.8,0.9],[74,68,1.0,0.6],[81,15,1.2,1],[88,52,0.7,0.7],[96,42,1.1,0.8],
            [6,75,0.9,0.9],[17,8,1.3,0.6],[27,58,0.8,1],[36,32,1.0,0.7],[46,88,1.2,0.8],
            [54,22,0.7,0.9],[62,72,1.1,0.6],[70,45,0.9,1],[77,12,1.3,0.8],[84,88,0.8,0.7],
          ].map(([x, y, r, op], i) => (
            <circle key={i}
              cx={`${x}%`} cy={`${y}%`} r={r}
              fill="white" opacity={op * 0.7}
              style={{ animation: `twinkle ${2.5 + (i % 5) * 0.7}s ease-in-out ${(i % 8) * 0.3}s infinite` }}
            />
          ))}
          {[[10,20],[35,60],[65,15],[80,70],[50,35]].map(([x,y],i) => (
            <g key={`bright-${i}`}>
              <circle cx={`${x}%`} cy={`${y}%`} r="1.5" fill="white" opacity="0.9" />
              <circle cx={`${x}%`} cy={`${y}%`} r="4" fill="rgba(255,255,255,0.06)" />
            </g>
          ))}
        </svg>

        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{
            width: 600, height: 600, border: '1px solid rgba(74,158,255,0.06)',
            borderRadius: '50%', position: 'absolute',
            animation: 'orbit-ring 60s linear infinite',
          }} />
          <div style={{
            width: 400, height: 400, border: '1px solid rgba(167,139,250,0.05)',
            borderRadius: '50%', position: 'absolute',
            animation: 'orbit-ring 40s linear infinite reverse',
          }} />
          <div style={{
            width: 600, height: 600, position: 'absolute',
            animation: 'orbit-ring 60s linear infinite',
          }}>
            <div style={{
              width: 6, height: 6, background: 'var(--accent)',
              borderRadius: '50%', position: 'absolute', top: 0, left: '50%',
              marginLeft: -3, marginTop: -3,
              boxShadow: '0 0 8px var(--accent)',
            }} />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 760, width: '100%' }}>
          <div className="anim-fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', marginBottom: 28,
            border: '1px solid rgba(74,158,255,0.2)',
            borderRadius: 100, fontSize: 13, color: 'rgba(74,158,255,0.9)',
            background: 'rgba(74,158,255,0.06)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} className="anim-pulse" />
            Plataforma de Transmissão via Satélite
          </div>

          <h1 className="anim-fade-up delay-1 font-display" style={{
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'white', marginBottom: 24,
          }}>
            Leve seu conteúdo<br />
            <span style={{
              background: 'linear-gradient(135deg, #4a9eff 0%, #a78bfa 60%, #4a9eff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}>além dos limites</span>
          </h1>

          <p className="anim-fade-up delay-2" style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(232,237,245,0.65)',
            maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7,
          }}>
            Simule transmissões via satélite, calcule custos, analise viabilidade e receba recomendações de IA para alcançar regiões remotas com mais eficiência.
          </p>

          <div className="anim-fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/simulacao" className="btn-primary" style={{ fontSize: 15, padding: '12px 28px', borderRadius: 10 }}>
              <Zap size={16} />
              Simular Transmissão
              <ArrowRight size={15} />
            </Link>
            <Link to="/dashboard" className="btn-ghost" style={{ fontSize: 15, padding: '12px 28px', borderRadius: 10 }}>
              <BarChart3 size={16} />
              Ver Dashboard
            </Link>
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
        }} />
      </section>

      <section style={{ background: 'var(--bg)', padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 1,
            border: '1px solid var(--border)',
            borderRadius: 14,
            overflow: 'hidden',
            background: 'var(--border)',
          }}>
            {stats.map((s, i) => (
              <div key={s.label} className={`anim-fade-up delay-${i+1}`} style={{
                background: 'var(--bg-card)',
                padding: '28px 24px', textAlign: 'center',
              }}>
                <div className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="font-display anim-fade-up" style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              Por que o OrbitCast?
            </h2>
            <p className="anim-fade-up delay-1" style={{ fontSize: 16, color: 'var(--text-dim)', marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
              Tudo que você precisa para planejar transmissões via satélite com precisão.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {features.map((f, i) => (
              <div key={f.title} className={`card card-hover anim-fade-up delay-${i % 4 + 1}`} style={{ padding: '24px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${f.color}14`, border: `1px solid ${f.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, color: f.color,
                }}>
                  {f.icon}
                </div>
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: 'white', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="font-display anim-fade-up" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Para quem é o OrbitCast?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-dim)', marginBottom: 40 }}>
            Ideal para qualquer organização que precise levar conteúdo onde a internet não chega.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {['Emissoras Locais','Canais Educativos','Eventos Regionais','Produtoras Independentes','Prefeituras','Igrejas','Saúde Pública','Defesa Civil'].map(item => (
              <div key={item} style={{
                padding: '10px 18px',
                border: '1px solid var(--border)',
                borderRadius: 8, fontSize: 14,
                color: 'var(--text-muted)',
                background: 'var(--bg-card)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,158,255,0.35)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', padding: '80px 24px' }}>
        <div style={{
          maxWidth: 700, margin: '0 auto', textAlign: 'center',
          padding: '60px 40px',
          border: '1px solid rgba(74,158,255,0.15)',
          borderRadius: 20,
          background: 'radial-gradient(ellipse at top, rgba(74,158,255,0.06) 0%, transparent 70%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }} className="anim-float">🛰️</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: 'white', marginBottom: 14, letterSpacing: '-0.02em' }}>
            Pronto para simular?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-dim)', marginBottom: 32, lineHeight: 1.6 }}>
            Configure sua campanha, selecione as regiões e deixe a IA recomendar a melhor estratégia de cobertura.
          </p>
          <Link to="/simulacao" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px', borderRadius: 10 }}>
            <Zap size={18} />
            Começar Simulação
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer style={{
        background: 'var(--bg)', borderTop: '1px solid var(--border)',
        padding: '24px', textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
          © 2026 OrbitCast · Global Solution FIAP · Economia Espacial & Conectividade via Satélite
        </p>
      </footer>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes orbit-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </PublicLayout>
  );
}
