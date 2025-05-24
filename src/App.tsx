import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner, Toaster } from "@/components/ui/sonner";
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
import DoctorTipDetail from '@/pages/doctorTipDetail';
import ServiceDetailPage from '@/components/ServiceDetailPage';
import TrainingPage from '@/pages/TrainingPage';
import GalleryPage from '@/pages/GalleryPage';
import TreatmentPage from '@/pages/TreatmentPage';
import EmiContact from '@/pages/EmiContact';
import "./App.css";
import { TooltipProvider } from './components/ui/tooltip';
import TreatmentsPage from "@/pages/TreatmentsPage";
import ScrollToTop from './components/ScrollToTop';
// import BookAppointment from "@/pages/BookAppointment";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>

            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/doctor-tips" element={<DoctorTipsPage />} />
            <Route path="/doctor-tips/:id" element={<DoctorTipDetail />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/treatments" element={<TreatmentsPage />} />
            <Route path="/treatment/:slug" element={<TreatmentPage />} />
            <Route path="/emi-contact" element={<EmiContact />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/media" element={<AdminMediaPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/video/add" element={<AdminAddVideoPage />} />
            <Route path="/admin/video/edit/:id" element={<AdminEditVideoPage />} />
            {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
                      <div className="fixed bottom-0 left-0 right-0 w-full bg-dental-blue z-50">
              <div className="text-center whitespace-nowrap overflow-hidden">
                <span className="text-1xl text-white inline-block px-3 py-2" style={{ fontFamily: "'Playpen Sans', cursive" }} >
                  Dr Prabha's Dentistry - Where Your Smile Meets Expertise
                </span>
              </div>
            </div>

        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
