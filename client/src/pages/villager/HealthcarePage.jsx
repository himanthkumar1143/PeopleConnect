import { useState, useEffect } from 'react';
import { fetchHealthInfo } from '../../api/healthcare.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import HealthcareCard from '../../components/cards/HealthcareCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { Activity } from 'lucide-react';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <Activity size={56} strokeWidth={1.5} color="#d4d0c8" className="mb-4" />
    <h3 className="text-[16px] font-medium text-[#2C2C2A]">No healthcare info available</h3>
    <p className="text-[13px] text-[#5F5E5A] mt-1">Check back soon for health services near you.</p>
  </div>
);

const HealthcarePage = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthInfo()
      .then(({ data }) => setItems(data.info || []))
      .catch(() => showToast('Failed to load healthcare information', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <VillagerLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Healthcare</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Health services and wellness information available in your region</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => <HealthcareCard key={item._id} item={item} />)}
        </div>
      )}
    </VillagerLayout>
  );
};

export default HealthcarePage;
