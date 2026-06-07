import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}
