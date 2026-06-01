import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout';

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="flex min-h-[calc(100vh-var(--nav-h))] items-center justify-center p-6">
        <div className="text-center anim-fade-up">
          <div className="mb-6 font-display text-[100px] font-bold leading-none text-[var(--border)]">404</div>
          <h1 className="mb-2.5 font-display text-2xl font-bold text-white">Página não encontrada</h1>
          <p className="mb-8 text-[15px] text-[var(--text-dim)]">A rota que você acessou não existe ou foi removida.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary"><Home size={15}/>Ir para Home</Link>
            <button className="btn-ghost" onClick={()=>window.history.back()}><ArrowLeft size={15}/>Voltar</button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
