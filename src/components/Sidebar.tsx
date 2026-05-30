import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, MapPin, Zap, Info, HelpCircle, Users, Mail, ChevronRight } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/campanhas', label: 'Campanhas', icon: Radio },
  { to: '/regioes', label: 'Regiões', icon: MapPin },
  { to: '/simulacao', label: 'Simulação', icon: Zap },
  null,
  { to: '/sobre', label: 'Sobre', icon: Info },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/integrantes', label: 'Integrantes', icon: Users },
  { to: '/contato', label: 'Contato', icon: Mail },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar-desktop fixed bottom-0 left-0 top-14 z-50 flex flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg)] px-3 py-4">
      <nav className="flex flex-col gap-0.5">
        {items.map((item, i) => {
          if (!item) return <div key={i} className="mx-1 my-2 h-px bg-[var(--border)]" />;
          const Icon = item.icon;
          const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-2.5 rounded-lg px-3 py-[9px] text-sm no-underline transition-all hover:bg-white/5 hover:text-white ${
                active
                  ? 'bg-[rgba(74,158,255,0.1)] font-semibold text-white'
                  : 'font-normal text-[var(--text-muted)]'
              }`}
            >
              {active && <div className="absolute bottom-[20%] left-0 top-[20%] w-[3px] rounded-r-[3px] bg-[var(--accent)]" />}
              <Icon size={16} className={`shrink-0 ${active ? 'text-[var(--accent)]' : 'text-inherit'}`} />
              <span>{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto opacity-40" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[var(--border)] p-3">
        <div className="flex items-center gap-2">
          <div className="h-[7px] w-[7px] rounded-full bg-[var(--success)] shadow-[0_0_6px_rgba(72,187,120,0.6)]" />
          <span className="text-xs text-[var(--text-dim)]">Sistema Operacional</span>
        </div>
        <div className="mt-1.5 font-mono text-[11px] text-[var(--text-dim)]">
          v1.0.0 · OrbitCast
        </div>
      </div>

      <style>{`
        .sidebar-desktop { width: 220px; }
        @media (max-width: 1023px) { .sidebar-desktop { display: none !important; } }
      `}</style>
    </aside>
  );
}
