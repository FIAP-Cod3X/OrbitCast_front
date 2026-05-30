import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <Sidebar />
      <main className="dashboard-main min-h-screen">
        <div className="dashboard-content">
          {children}
        </div>
      </main>
      <style>{`
        .dashboard-main {
          margin-left: 220px;
          width: calc(100% - 220px);
          padding-top: 56px;
        }

        .dashboard-content {
          width: min(100%, 1400px);
          margin: 0 auto;
          padding: 28px 32px;
        }

        @media (max-width: 1023px) {
          .dashboard-main {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          .dashboard-content { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}
