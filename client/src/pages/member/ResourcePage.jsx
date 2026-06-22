import { useState, useEffect } from 'react';
import { fetchTips } from '../../api/resource.api';
import { useToast } from '../../context/ToastContext';
import MemberLayout from '../../components/layout/MemberLayout';
import ResourceCard from '../../components/cards/ResourceCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { Users } from 'lucide-react';

const tabs = ['all', 'tip', 'scheme'];

const EmptyState = ({ filter }) => (
  <div className="flex flex-col items-center py-16 text-center">
    <Users size={56} strokeWidth={1.5} className="mb-4 text-slate-300" />
    <h3 className="text-[16px] font-medium text-[#1E293B]">No {filter === 'all' ? 'tips or schemes' : filter + 's'} found</h3>
    <p className="text-[13px] text-[#64748B] mt-1">Check back later for new content.</p>
  </div>
);

const ResourcePage = () => {
  const { showToast } = useToast();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchTips()
      .then(({ data }) => setTips(data.tips || []))
      .catch(() => showToast('Failed to load resources data', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === 'all' ? tips : tips.filter((t) => t.category === activeTab);

  return (
    <MemberLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#1E293B]">Resources</h1>
        <p className="text-[14px] text-[#64748B] mt-1">Tips and schemes to help you grow</p>
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
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-[#64748B] border-[#d4d0c8] hover:border-[#2563EB]/30 hover:text-[#2563EB]'
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
          {filtered.map((tip) => <ResourceCard key={tip._id} tip={tip} />)}
        </div>
      )}
    </MemberLayout>
  );
};

export default ResourcePage;
