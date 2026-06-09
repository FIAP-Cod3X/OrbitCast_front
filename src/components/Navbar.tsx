import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/campanhas', label: 'Campanhas' },
  { to: '/regioes', label: 'Regiões' },
  { to: '/simulacao', label: 'Simulação' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/faq', label: 'FAQ' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex h-14 items-center border-b border-[var(--border)] bg-[#080c14eb] backdrop-blur-xl">
      <div className="grid w-full grid-cols-[220px_minmax(0,1fr)_220px] items-center gap-4 px-6 max-[1100px]:flex max-[1100px]:justify-between">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_40%_40%,#4a9eff,#1a3a6b)] shadow-[0_0_12px_rgba(74,158,255,0.4)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="white"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="white" strokeWidth="1.5" fill="none"/>
              <ellipse cx="12" cy="12" rx="4" ry="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none"/>
            </svg>
          </div>
          <span className="font-display text-[17px] font-bold text-white">
            Orbit<span className="text-[var(--accent)]">Cast</span>
          </span>
        </Link>

        <nav className="flex items-center justify-center gap-1 justify-self-center max-[1100px]:hidden">
          {links.map(l => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap rounded-[7px] border px-3.5 py-1.5 text-sm no-underline transition-all hover:bg-white/5 hover:text-white ${
                  active
                    ? 'border-[rgba(74,158,255,0.2)] bg-[rgba(74,158,255,0.12)] font-semibold text-white'
                    : 'border-transparent font-normal text-[var(--text-muted)]'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-3 justify-self-end">
          <Link to="/simulacao" className="btn-primary btn-sm rounded-[7px] max-[1100px]:hidden">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Simular Agora
          </Link>

          <button
            className="hidden cursor-pointer border-0 bg-transparent p-1 text-[var(--text-muted)] max-[1100px]:flex"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-14 flex flex-col gap-1 border-b border-[var(--border)] bg-[#080c14fa] px-4 pb-4 pt-3">
          {links.map(l => {
            const active = l.to === '/' ? pathname === '/' : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3.5 py-2.5 text-[15px] no-underline transition-all ${
                  active
                    ? 'bg-[rgba(74,158,255,0.1)] font-semibold text-white'
                    : 'font-normal text-[var(--text-muted)]'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link to="/simulacao" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">
            Simular Agora
          </Link>
        </div>
      )}
    </header>
  );
}
