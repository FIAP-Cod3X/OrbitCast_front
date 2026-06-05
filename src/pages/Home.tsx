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
  { icon: <Zap size={22} />, title: 'Simulação em Tempo Real', desc: 'Calcule custo, alcance e viabilidade de transmissões por satélite instantaneamente.', tone: 'yellow' },
  { icon: <Brain size={22} />, title: 'Recomendações de Viabilidade', desc: 'A API gera recomendações com base em custo, alcance, qualidade de sinal e regiões associadas.', tone: 'purple' },
  { icon: <Globe size={22} />, title: 'Regiões Cadastradas', desc: 'Base com regiões brasileiras, população estimada, prioridade social e índice de conectividade.', tone: 'blue' },
  { icon: <Shield size={22} />, title: 'Score de Viabilidade', desc: 'Análise detalhada de custo-benefício com classificação Alta, Média ou Baixa.', tone: 'green' },
  { icon: <BarChart3 size={22} />, title: 'Dashboard Analítico', desc: 'Métricas completas, gráficos interativos e rankings de campanhas em tempo real.', tone: 'sky' },
  { icon: <Radio size={22} />, title: 'Multi-qualidade', desc: 'Suporte a SD, HD, Full HD e 4K com cálculo de custo diferenciado por qualidade.', tone: 'red' },
];

const stars = [
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
];

const brightStars = [[10,20],[35,60],[65,15],[80,70],[50,35]];
const audience = ['Emissoras Locais','Canais Educativos','Eventos Regionais','Produtoras Independentes','Prefeituras','Igrejas','Saúde Pública','Defesa Civil'];

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="home-hero">
        <div className="home-space-bg" />
        <div className="home-nebula">
          <div className="home-nebula-blob home-nebula-blue" />
          <div className="home-nebula-blob home-nebula-purple" />
          <div className="home-nebula-blob home-nebula-bottom" />
        </div>

        <svg className="home-stars" xmlns="http://www.w3.org/2000/svg">
          {stars.map(([x, y, r, op], i) => (
            <circle
              key={i}
              className={`home-star home-star-speed-${i % 5} home-star-delay-${i % 8}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="white"
              opacity={op * 0.7}
            />
          ))}
          {brightStars.map(([x,y],i) => (
            <g key={`bright-${i}`}>
              <circle cx={`${x}%`} cy={`${y}%`} r="1.5" fill="white" opacity="0.9" />
              <circle cx={`${x}%`} cy={`${y}%`} r="4" fill="rgba(255,255,255,0.06)" />
            </g>
          ))}
        </svg>

        <div className="home-orbits">
          <div className="home-orbit home-orbit-large" />
          <div className="home-orbit home-orbit-small" />
          <div className="home-satellite-path">
            <div className="home-satellite-dot" />
          </div>
        </div>

        <div className="home-hero-content">
          <div className="home-kicker anim-fade-up">
            <div className="home-kicker-dot anim-pulse" />
            Plataforma de Transmissão via Satélite
          </div>

          <h1 className="home-title anim-fade-up delay-1 font-display">
            Leve seu conteúdo<br />
            <span>além dos limites</span>
          </h1>

          <p className="home-subtitle anim-fade-up delay-2">
            Simule transmissões via satélite, calcule custos, analise viabilidade e receba recomendações de IA para alcançar regiões remotas com mais eficiência.
          </p>

          <div className="home-actions anim-fade-up delay-3">
            <Link to="/simulacao" className="btn-primary home-action">
              <Zap size={16} />
              Simular Transmissão
              <ArrowRight size={15} />
            </Link>
            <Link to="/dashboard" className="btn-ghost home-action">
              <BarChart3 size={16} />
              Ver Dashboard
            </Link>
          </div>
        </div>

        <div className="home-bottom-fade" />
      </section>

      <section className="home-section home-stats-section">
        <div className="home-stats-wrap">
          <div className="home-stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className={`home-stat anim-fade-up delay-${i+1}`}>
                <div className="home-stat-value font-display">{s.value}</div>
                <div className="home-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-features-section">
        <div className="home-content-wide">
          <div className="home-section-heading">
            <h2 className="home-section-title font-display anim-fade-up">Por que o OrbitCast?</h2>
            <p className="home-section-copy anim-fade-up delay-1">Tudo que você precisa para planejar transmissões via satélite com precisão.</p>
          </div>
          <div className="home-feature-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`card card-hover home-feature-card home-feature-${f.tone} anim-fade-up delay-${i % 4 + 1}`}>
                <div className="home-feature-icon">{f.icon}</div>
                <h3 className="home-feature-title font-display">{f.title}</h3>
                <p className="home-feature-copy">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-audience-section">
        <div className="home-content-centered">
          <h2 className="home-audience-title font-display anim-fade-up">Para quem é o OrbitCast?</h2>
          <p className="home-audience-copy">Ideal para qualquer organização que precise levar conteúdo onde a internet não chega.</p>
          <div className="home-audience-list">
            {audience.map(item => <div key={item} className="home-audience-chip">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="home-section home-cta-section">
        <div className="home-cta">
          <div className="home-cta-icon anim-float">🛰️</div>
          <h2 className="home-cta-title font-display">Pronto para simular?</h2>
          <p className="home-cta-copy">Configure sua campanha, selecione as regiões e deixe a IA recomendar a melhor estratégia de cobertura.</p>
          <Link to="/simulacao" className="btn-primary home-cta-button">
            <Zap size={18} />
            Começar Simulação
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 OrbitCast · Global Solution FIAP · Economia Espacial & Conectividade via Satélite</p>
      </footer>
    </PublicLayout>
  );
}
