import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doctorTipsService, DoctorTip } from '../services/doctorTips';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DoctorTipDetail() {
  const { id } = useParams<{ id: string }>();
  const [tip, setTip] = useState<DoctorTip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTip = async () => {
      if (!id) {
        console.log('No ID provided');
        return;
      }
      
      console.log('Fetching tip with ID:', id);
      try {
        const data = await doctorTipsService.getTipById(id);
        console.log('Fetched tip data:', data);
        setTip(data);
      } catch (err) {
        console.error('Error fetching tip:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch doctor tip');
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-red-500 text-center p-4">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center p-4">
            <h2 className="text-2xl font-bold mb-2">Doctor Tip Not Found</h2>
            <p className="text-gray-600">The requested doctor tip could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Image Section */}
        {tip.image_url && (
          <div className="relative w-full h-[500px] bg-gray-100">
            <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
            <img 
              src={tip.image_url} 
              alt={tip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="w-full bg-gradient-to-t from-black/70 to-transparent p-8">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {tip.title}
                  </h1>
                  <div className="flex items-center text-white/90">
                    <span className="mr-4">By {tip.author}</span>
                    <span>{new Date(tip.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section - Full Width */}
        <div className="w-full bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {tip.description}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
