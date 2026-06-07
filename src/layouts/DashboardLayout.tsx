import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <Sidebar />
      <main className="dashboard-shell">
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
}
