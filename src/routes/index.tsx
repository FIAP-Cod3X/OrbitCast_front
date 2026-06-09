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
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/campanhas" element={<CampanhasPage />} />
      <Route path="/regioes" element={<RegioesPage />} />
      <Route path="/simulacao" element={<SimulacaoPage />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/integrantes" element={<IntegrantesPage />} />
      <Route path="/contato" element={<ContatoPage />} />

      <Route path="/campanhas/:id" element={<CampanhaDetalhes />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
