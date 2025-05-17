
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminMediaPage from '@/pages/AdminMediaPage';
import AdminSettingsPage from '@/pages/AdminSettingsPage';
import AdminAddVideoPage from '@/pages/AdminAddVideoPage';
import AdminEditVideoPage from '@/pages/AdminEditVideoPage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import DoctorTipsPage from '@/pages/DoctorTipsPage';
import DoctorDataTips from '@/pages/DoctorDataTips';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import TrainingPage from '@/pages/TrainingPage';
import GalleryPage from '@/pages/GalleryPage';
import TreatmentPage from '@/pages/TreatmentPage';
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/doctor-tips" element={<DoctorTipsPage />} />
          <Route path="/doctor-tips/:id" element={<DoctorDataTips />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/treatments" element={<TreatmentPage />} />
          <Route path="/treatments/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/media" element={<AdminMediaPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/video/add" element={<AdminAddVideoPage />} />
          <Route path="/admin/video/edit/:id" element={<AdminEditVideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
