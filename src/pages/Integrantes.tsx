import { ExternalLink } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';
import type { IntegranteType } from '../types';

const integrantes: IntegranteType[] = [
  { nome:'Gabriel Stuani', rm:'RM566682', turma:'1TDSPB', foto:'/img/gabriel.jpg', github:'https://github.com/Gstuani', linkedin:'https://www.linkedin.com/in/gabrielstuani/', role:'Desenvolvedor Front-End' },
  { nome:'Guilherme Soares', rm:'RM568227', turma:'1TDSPB', foto:'/img/guilherme.jpeg', github:'https://github.com/Guilherme-Soares00', linkedin:'https://www.linkedin.com/in/guilherme-soares-alberti/', role:'Desenvolvedor Front-End' },
  { nome:'Erick Ramos Santos', rm:'RM567837', turma:'1TDSPB', foto:'/img/erick.jpeg', github:'https://github.com/erickramossantoser', linkedin:'https://www.linkedin.com/in/erickrsantos/', role:'Desenvolvedor Front-End' },
  { nome:'Matheus Carneiro Maciel', rm:'RM567753', turma:'1TDSPB', foto:'', github:'https://github.com/kakarneiro', linkedin:'https://www.linkedin.com/in/matheus-carneiro-maciel?trk=contact-info', role:'Desenvolvedor Front-End' },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase();
  return (
    <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-violet-700 font-display text-[22px] font-bold text-white">
      {initials}
    </div>
  );
}

export default function IntegrantesPage() {
  return (
    <PublicLayout>
      <div className="public-page public-page-md">
        <div className="mb-14 text-center anim-fade-up">
          <span className="mb-3 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
            Global Solution · FIAP 2025
          </span>
          <h1 className="mb-3 font-display text-[clamp(28px,4vw,40px)] font-bold text-white">
            Nossa Equipe
          </h1>
          <p className="text-base text-[var(--text-dim)]">Os desenvolvedores por trás do OrbitCast.</p>
        </div>

        <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {integrantes.map((int,i) => (
            <div key={int.rm} className={`card card-hover px-6 py-7 anim-fade-up delay-${i+1}`}>
              <div className="mb-5 flex items-center gap-4">
                {int.foto
                  ? <img src={int.foto} alt={int.nome} className="h-[72px] w-[72px] shrink-0 rounded-full border-2 border-[var(--border)] object-cover" />
                  : <Avatar name={int.nome} />
                }
                <div>
                  <h3 className="mb-1 font-display text-base font-bold text-white">{int.nome}</h3>
                  <p className="mb-1 text-[13px] font-medium text-[var(--accent)]">{int.role}</p>
                  <span className="badge badge-purple text-[10px]">{int.turma}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[var(--text-dim)]">RM</span>
                  <span className="font-mono text-xs font-medium text-[var(--text)]">{int.rm}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={int.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] border border-[var(--border)] bg-[var(--bg)] py-2 text-[13px] text-[var(--text-muted)] no-underline transition-all hover:border-white/20 hover:text-white"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
                <a
                  href={int.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] border border-[var(--border)] bg-[var(--bg)] py-2 text-[13px] text-[var(--text-muted)] no-underline transition-all hover:border-[rgba(74,158,255,0.3)] hover:text-[var(--accent)]"
                >
                  <ExternalLink size={13} />
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-7 text-center">
          <h3 className="mb-2 font-display text-[17px] font-bold text-white">
            Front-End Design Engineering + Domain Driven Design Using Java
          </h3>
          <p className="mb-4 text-sm text-[var(--text-dim)]">
            Global Solution FIAP 2025 · Tema: Economia Espacial & Conectividade via Satélite
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React + Vite','TypeScript','Tailwind CSS','Java Spring Boot','Oracle DB','Vercel'].map(t=>(
              <span key={t} className="rounded-[5px] border border-[var(--border)] px-3 py-1 text-[13px] text-[var(--text-muted)]">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
