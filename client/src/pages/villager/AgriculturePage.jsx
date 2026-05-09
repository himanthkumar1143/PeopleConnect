import { useState, useEffect } from 'react';
import { fetchTips } from '../../api/agriculture.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import AgricultureCard from '../../components/cards/AgricultureCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { Leaf } from 'lucide-react';

const tabs = ['all', 'tip', 'scheme'];

const EmptyState = ({ filter }) => (
  <div className="flex flex-col items-center py-16 text-center">
    <Leaf size={56} strokeWidth={1.5} color="#d4d0c8" className="mb-4" />
    <h3 className="text-[16px] font-medium text-[#2C2C2A]">No {filter === 'all' ? 'tips or schemes' : filter + 's'} found</h3>
    <p className="text-[13px] text-[#5F5E5A] mt-1">Check back later for new content.</p>
  </div>
);

const AgriculturePage = () => {
  const { showToast } = useToast();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchTips()
      .then(({ data }) => setTips(data.tips || []))
      .catch(() => showToast('Failed to load agriculture data', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'all' ? tips : tips.filter((t) => t.category === activeTab);

  return (
    <VillagerLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Agriculture</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Farming tips and government schemes to help you grow</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`agri-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all
              ${activeTab === tab
                ? 'bg-[#3B6D11] text-white border-[#3B6D11]'
                : 'bg-white text-[#5F5E5A] border-[#d4d0c8] hover:border-[#3B6D11]/30 hover:text-[#3B6D11]'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState filter={activeTab} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tip) => <AgricultureCard key={tip._id} tip={tip} />)}
        </div>
      )}
    </VillagerLayout>
  );
};

export default AgriculturePage;
