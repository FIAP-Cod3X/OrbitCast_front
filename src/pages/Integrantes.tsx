import { Code2, ExternalLink, UsersRound } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';
import { API_BASE_URL } from '../services/api';
import type { IntegranteType } from '../types';

type TeamMember = IntegranteType & {
  foco: string;
  descricao: string;
};

const integrantes: TeamMember[] = [
  {
    nome: 'Gabriel Stuani',
    rm: 'RM566682',
    turma: '1TDSPB',
    foto: '/img/gabriel.jpg',
    github: 'https://github.com/Gstuani',
    linkedin: 'https://www.linkedin.com/in/gabrielstuani/',
    role: 'Front-End Developer',
    foco: 'Interface e experiencia',
    descricao: 'Atua na composicao visual das telas publicas e na consistencia dos fluxos de navegacao.',
  },
  {
    nome: 'Guilherme Soares',
    rm: 'RM568227',
    turma: '1TDSPB',
    foto: '/img/guilherme.jpeg',
    github: 'https://github.com/Guilherme-Soares00',
    linkedin: 'https://www.linkedin.com/in/guilherme-soares-alberti/',
    role: 'Front-End Developer',
    foco: 'Componentes e responsividade',
    descricao: 'Organiza componentes reutilizaveis e garante que a experiencia funcione bem em diferentes tamanhos de tela.',
  },
  {
    nome: 'Erick Ramos Santos',
    rm: 'RM567837',
    turma: '1TDSPB',
    foto: '/img/erick.jpeg',
    github: 'https://github.com/erickramossantoser',
    linkedin: 'https://www.linkedin.com/in/erickrsantos/',
    role: 'Front-End Developer',
    foco: 'Integracao e dados',
    descricao: 'Conecta o front-end com a API Java e cuida dos fluxos de dados usados nas simulacoes e dashboards.',
  },
  {
    nome: 'Matheus Carneiro Maciel',
    rm: 'RM567753',
    turma: '1TDSPB',
    foto: '/img/matheus.jpg',
    github: 'https://github.com/kakarneiro',
    linkedin: 'https://www.linkedin.com/in/matheus-carneiro-maciel?trk=contact-info',
    role: 'Front-End Developer',
    foco: 'Documentacao e qualidade',
    descricao: 'Apoia a organizacao da entrega, validacao das informacoes e acabamento das areas institucionais.',
  },
];

const stack = ['React + Vite', 'TypeScript', 'Tailwind CSS', 'Quarkus', 'Oracle DB', 'Render'];

export default function IntegrantesPage() {
  return (
    <PublicLayout>
      <div className="public-page public-page-md">
        <section className="mb-10 grid gap-8 border-b border-[var(--border)] pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="anim-fade-up">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
              <UsersRound size={14} />
              Global Solution · FIAP 2026
            </span>
            <h1 className="mb-4 max-w-[680px] font-display text-[clamp(34px,5vw,58px)] font-bold leading-[1.02] text-white">
              Equipe OrbitCast
            </h1>
            <p className="max-w-[620px] text-base leading-7 text-[var(--text-dim)]">
              Quatro integrantes da turma 1TDSPB construindo uma experiencia para planejamento de transmissoes via satelite, com foco em clareza operacional, dados e integracao com API Java.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 anim-fade-up delay-1">
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
              <p className="font-display text-3xl font-bold text-white">4</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">integrantes</p>
            </div>
            <div className="rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
              <p className="font-display text-3xl font-bold text-white">1TDSPB</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">turma</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
          {integrantes.map((integrante, index) => (
            <article
              key={integrante.rm}
              className={`group overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(74,158,255,0.36)] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)] anim-fade-up delay-${index + 1}`}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[var(--bg)]">
                <img
                  src={integrante.foto}
                  alt={integrante.nome}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(3,8,20,0.92)] to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="rounded-[6px] border border-white/10 bg-black/35 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    {integrante.rm}
                  </span>
                  <span className="rounded-[6px] border border-[rgba(74,158,255,0.28)] bg-[rgba(74,158,255,0.14)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)] backdrop-blur">
                    {integrante.turma}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-5 min-h-[156px]">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-[6px] border border-[rgba(74,158,255,0.22)] bg-[rgba(74,158,255,0.08)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
                      {integrante.role}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-dim)]">
                      {integrante.foco}
                    </span>
                  </div>
                  <h2 className="mb-3 font-display text-[clamp(19px,2vw,24px)] font-bold leading-tight text-white">
                    {integrante.nome}
                  </h2>
                  <p className="text-sm leading-6 text-[var(--text-dim)] sm:text-[15px]">
                    {integrante.descricao}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={integrante.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] no-underline transition-colors hover:border-white/20 hover:text-white"
                    aria-label={`GitHub de ${integrante.nome}`}
                  >
                    <Code2 size={15} />
                    GitHub
                  </a>
                  <a
                    href={integrante.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-[7px] border border-[rgba(74,158,255,0.18)] bg-[rgba(74,158,255,0.08)] px-3 py-2.5 text-sm font-medium text-[var(--accent)] no-underline transition-colors hover:border-[rgba(74,158,255,0.38)] hover:bg-[rgba(74,158,255,0.12)]"
                    aria-label={`LinkedIn de ${integrante.nome}`}
                  >
                    <ExternalLink size={15} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-5 flex max-w-[900px] flex-col gap-4 rounded-[8px] border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-white">
              Front-End Design Engineering + Domain Driven Design Using Java
            </h3>
            <p className="mt-1 text-sm text-[var(--text-dim)]">
              Economia Espacial e Conectividade via Satelite
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-[6px] border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-[13px] text-[var(--text-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href={`${API_BASE_URL}/health`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[7px] border border-[rgba(74,158,255,0.25)] px-3.5 py-2 text-sm font-semibold text-[var(--accent)] no-underline transition-colors hover:bg-[rgba(74,158,255,0.08)]"
          >
            API
            <ExternalLink size={14} />
          </a>
        </section>
      </div>
    </PublicLayout>
  );
}
