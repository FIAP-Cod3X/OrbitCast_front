import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import DashboardPage from '../pages/Dashboard';
import CampanhasPage from '../pages/Campanhas';
import CampanhaDetalhes from '../pages/CampanhaDetalhes';
import RegioesPage from '../pages/Regioes';
import SimulacaoPage from '../pages/Simulacao';
import IntegrantesPage from '../pages/Integrantes';
import NotFound from '../pages/NotFound';
import { SobrePage, FAQPage, ContatoPage } from '../pages/Extra';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Static routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/campanhas" element={<CampanhasPage />} />
      <Route path="/regioes" element={<RegioesPage />} />
      <Route path="/simulacao" element={<SimulacaoPage />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/integrantes" element={<IntegrantesPage />} />
      <Route path="/contato" element={<ContatoPage />} />

      {/* Dynamic route with param */}
      <Route path="/campanhas/:id" element={<CampanhaDetalhes />} />

      {/* Redirects */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
