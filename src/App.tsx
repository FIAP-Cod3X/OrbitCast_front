import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-[#060b1a]">
          <ScrollToTop />
          <AppRoutes />
          <ToastContainer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
