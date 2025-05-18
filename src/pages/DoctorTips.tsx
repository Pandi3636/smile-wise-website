import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doctorTipsService, DoctorTip } from '../services/doctorTips';

export default function DoctorTips() {
  const [tips, setTips] = useState<DoctorTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await doctorTipsService.getAllTips();
        setTips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch doctor tips');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Doctor Tips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <Link 
            key={tip.id} 
            to={`/doctor-tips/${tip.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {tip.image_url && (
              <img 
                src={tip.image_url} 
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-gray-600 mb-2">By {tip.author}</p>
              <p className="text-gray-500 text-sm">
                {new Date(tip.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 