import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchResourceById } from '../../api/education.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatDate';
import { ChevronLeft, BookOpen, ExternalLink } from 'lucide-react';

const EducationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResourceById(id)
      .then(({ data }) => setResource(data.resource))
      .catch(() => {
        showToast('Could not load education details.', 'error');
        navigate('/education');
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

  if (!resource) return null;

  return (
    <VillagerLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[13px] text-[#5F5E5A] hover:text-[#3B6D11] mb-5 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Education
        </button>

        <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              <h1 className="text-[22px] font-medium text-[#2C2C2A]">{resource.title}</h1>
              <p className="text-[14px] text-[#5F5E5A] mt-1">{resource.courseName}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 shrink-0">
              <BookOpen size={24} strokeWidth={2} />
            </div>
          </div>

          {resource.description && (
            <div className="prose-sm text-[14px] text-[#2C2C2A] leading-relaxed whitespace-pre-wrap mb-6">
              {resource.description}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#EAF3DE]">
            <p className="text-[12px] text-[#5F5E5A]">
              Updated {formatDate(resource.updatedAt)}
            </p>
            <div className="flex gap-2">
              {resource.resourceLink ? (
                <a
                  href={resource.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#3B6D11] font-medium hover:underline flex items-center gap-1"
                >
                  Open Resource
                  <ExternalLink size={12} strokeWidth={2.5} />
                </a>
              ) : null}
              <Button id="education-action-btn" size="md">
                Enroll Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </VillagerLayout>
  );
};

export default EducationDetailPage;
