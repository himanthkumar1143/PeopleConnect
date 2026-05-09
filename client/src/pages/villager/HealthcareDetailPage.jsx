import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchHealthInfoById } from '../../api/healthcare.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatDate';
import { ChevronLeft, Activity } from 'lucide-react';

const HealthcareDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthInfoById(id)
      .then(({ data }) => setItem(data.info))
      .catch(() => {
        showToast('Could not load healthcare details.', 'error');
        navigate('/healthcare');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <VillagerLayout>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-5 w-1/3" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      </VillagerLayout>
    );
  }

  if (!item) return null;

  return (
    <VillagerLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[13px] text-[#5F5E5A] hover:text-[#3B6D11] mb-5 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Healthcare
        </button>

        <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              <h1 className="text-[22px] font-medium text-[#2C2C2A]">{item.title}</h1>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-400 shrink-0">
              <Activity size={24} strokeWidth={2} />
            </div>
          </div>

          <div className="mb-4 px-4 py-3 bg-[#EAF3DE] rounded-lg">
            <p className="text-[11px] text-[#5F5E5A] uppercase tracking-wide mb-1">Services Available</p>
            <p className="text-[14px] font-medium text-[#27500A]">{item.services}</p>
          </div>

          {item.description && (
            <div className="prose-sm text-[14px] text-[#2C2C2A] leading-relaxed whitespace-pre-wrap mb-6">
              {item.description}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#EAF3DE]">
            <p className="text-[12px] text-[#5F5E5A]">
              Updated {formatDate(item.updatedAt)}
            </p>
            <Button id="healthcare-action-btn" size="md">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </VillagerLayout>
  );
};

export default HealthcareDetailPage;
