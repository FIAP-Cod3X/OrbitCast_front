import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="public-main">
        {children}
      </main>
      <style>{`
        .public-main { padding-top: 56px; }
      `}</style>
    </div>
  );
}
