import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Loader2, X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import type { ToastType, ViabilidadeTipo, StatusCampanha } from '../../types';

/* ── BUTTON ── */
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
  loading?: boolean;
  icon?: ReactNode;
}
export function Button({ variant='primary', size='md', loading, icon, children, className='', disabled, ...p }: BtnProps) {
  const cls = variant === 'primary' ? 'btn-primary' : variant === 'danger' ? 'btn-danger' : 'btn-ghost';
  const sz = size === 'sm' ? 'btn-sm' : '';
  return (
    <button className={`${cls} ${sz} ${className}`} disabled={disabled || loading} {...p}>
      {loading ? <Loader2 size={14} className="anim-spin" /> : icon}
      {children}
    </button>
  );
}

/* ── INPUT ── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; }
export function Input({ label, error, className='', ...p }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="form-label">{label}</label>}
      <input className={`form-input ${className}`} {...p} />
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}

/* ── SELECT ── */
interface SelProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string; error?: string;
  options: { value: string|number; label: string }[];
  placeholder?: string;
}
export function Select({ label, error, options, placeholder, className='', ...p }: SelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="form-label">{label}</label>}
      <select className={`form-input cursor-pointer ${className}`} {...p}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
}

/* ── TEXTAREA ── */
interface TaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label?: string; }
export function Textarea({ label, className='', ...p }: TaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="form-label">{label}</label>}
      <textarea className={`form-input min-h-[90px] resize-y ${className}`} {...p} />
    </div>
  );
}

/* ── CARD ── */
export function Card({ children, className='', style={} }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`card p-5 ${className}`} style={style}>{children}</div>;
}

/* ── MODAL ── */
export function Modal({ open, onClose, title, children, size='md' }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; size?: 'sm'|'md'|'lg';
}) {
  if (!open) return null;
  const maxW = size === 'sm' ? 440 : size === 'lg' ? 760 : 580;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md anim-fade-in" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_24px_60px_rgba(0,0,0,0.5)] anim-fade-up"
        style={{ maxWidth: maxW }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-[18px]">
          <span className="section-title">{title}</span>
          <button onClick={onClose} className="flex cursor-pointer rounded-md border-0 bg-transparent p-1 text-[var(--text-muted)]">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

/* ── LOADING ── */
export function Loading({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="h-9 w-9 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] anim-spin" />
      <span className="text-sm text-[var(--text-dim)]">{message}</span>
    </div>
  );
}

/* ── EMPTY STATE ── */
export function EmptyState({ title, message, action, icon }: { title?: string; message?: string; action?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      {icon && <div className="mb-1 text-[var(--text-dim)]">{icon}</div>}
      <h3 className="text-base font-semibold text-[var(--text-muted)]">{title ?? 'Nada encontrado'}</h3>
      {message && <p className="max-w-xs text-sm text-[var(--text-dim)]">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ── ERROR ── */
export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center">
      <XCircle size={40} className="text-[var(--danger)]" />
      <div>
        <p className="text-[15px] font-semibold text-[var(--text-muted)]">Erro ao carregar dados</p>
        <p className="mt-1 text-[13px] text-[var(--text-dim)]">{message}</p>
      </div>
      {onRetry && <Button variant="ghost" size="sm" onClick={onRetry}>Tentar novamente</Button>}
    </div>
  );
}

/* ── STATUS BADGE ── */
const statusMap: Record<StatusCampanha, { label: string; cls: string }> = {
  PLANEJADA: { label: 'Planejada', cls: 'badge badge-blue' },
  EM_ANALISE: { label: 'Em Análise', cls: 'badge badge-yellow' },
  APROVADA: { label: 'Aprovada', cls: 'badge badge-green' },
  CANCELADA: { label: 'Cancelada', cls: 'badge badge-red' },
  FINALIZADA: { label: 'Finalizada', cls: 'badge badge-gray' },
};
export function StatusBadge({ status }: { status: StatusCampanha }) {
  const c = statusMap[status] ?? { label: status, cls: 'badge badge-gray' };
  return <span className={c.cls}>{c.label}</span>;
}

/* ── VIABILIDADE BADGE ── */
const viabMap: Record<ViabilidadeTipo, { label: string; cls: string }> = {
  ALTA: { label: 'Alta', cls: 'badge badge-green' },
  MEDIA: { label: 'Média', cls: 'badge badge-yellow' },
  BAIXA: { label: 'Baixa', cls: 'badge badge-red' },
};
export function ViabilidadeBadge({ viabilidade }: { viabilidade: ViabilidadeTipo }) {
  const c = viabMap[viabilidade] ?? { label: viabilidade, cls: 'badge badge-gray' };
  return <span className={c.cls}>{c.label}</span>;
}

/* ── TOAST ── */
const toastStyle: Record<ToastType, { icon: ReactNode; border: string; bg: string }> = {
  success: { icon: <CheckCircle size={16} className="shrink-0 text-[var(--success)]" />, border: 'rgba(72,187,120,0.3)', bg: 'rgba(72,187,120,0.06)' },
  error: { icon: <XCircle size={16} className="shrink-0 text-[var(--danger)]" />, border: 'rgba(252,129,129,0.3)', bg: 'rgba(252,129,129,0.06)' },
  warning: { icon: <AlertTriangle size={16} className="shrink-0 text-[var(--warn)]" />, border: 'rgba(246,173,85,0.3)', bg: 'rgba(246,173,85,0.06)' },
  info: { icon: <Info size={16} className="shrink-0 text-[var(--accent)]" />, border: 'rgba(74,158,255,0.3)', bg: 'rgba(74,158,255,0.06)' },
};
export function ToastItem({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
  const s = toastStyle[type];
  return (
    <div
      className="flex min-w-[260px] max-w-[360px] items-center gap-2.5 rounded-[10px] bg-[color-mix(in_srgb,var(--bg-card)_95%,transparent)] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl anim-slide-right"
      style={{ border: `1px solid ${s.border}` }}
    >
      {s.icon}
      <p className="flex-1 text-[13px] text-[var(--text-muted)]">{message}</p>
      <button onClick={onClose} className="cursor-pointer border-0 bg-transparent p-0.5 text-[var(--text-dim)]">
        <X size={14} />
      </button>
    </div>
  );
}

/* ── METRIC CARD ── */
export function MetricCard({ label, value, icon, color='var(--accent)', subtitle }: {
  label: string; value: string|number; icon: ReactNode; color?: string; subtitle?: string;
}) {
  return (
    <div className="card card-hover px-[22px] py-5">
      <div className="mb-3.5 flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[var(--text-dim)]">{label}</span>
        <div className="opacity-70" style={{ color }}>{icon}</div>
      </div>
      <div className="metric-value" style={{ color }}>{value}</div>
      {subtitle && <div className="mt-1.5 text-xs text-[var(--text-dim)]">{subtitle}</div>}
    </div>
  );
}

/* ── PAGE HEADER ── */
export function PageHeader({ title, subtitle, action, icon }: {
  title: string; subtitle?: string; action?: ReactNode; icon?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <div className="shrink-0 text-[var(--accent)]">{icon}</div>}
        <div>
          <h1 className="font-display text-[22px] font-bold leading-tight text-[var(--text)]">{title}</h1>
          {subtitle && <p className="mt-1 text-[13px] text-[var(--text-dim)]">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ── SCORE RING ── */
export function ScoreRing({ score, size=72 }: { score: number; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, score) / 100) * circ;
  const color = score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--warn)' : 'var(--danger)';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size/5} fontFamily="Space Grotesk,sans-serif" fontWeight="700">
        {Math.round(score)}
      </text>
    </svg>
  );
}

// Alias
export const SectionHeader = PageHeader;
