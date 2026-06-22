import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../../api/job.api';
import { useToast } from '../../context/ToastContext';
import MemberLayout from '../../components/layout/MemberLayout';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatDate';
import { ChevronLeft, Building2, MapPin } from 'lucide-react';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobById(id)
      .then(({ data }) => setJob(data.job))
      .catch(() => {
        showToast('Could not load job details.', 'error');
        navigate('/jobs');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MemberLayout>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-5 w-1/3" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>
      </MemberLayout>
    );
  }

  if (!job) return null;

  return (
    <MemberLayout>
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#2563EB] mb-5 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={2} />
          Back to Jobs
        </button>

        <div className="bg-white rounded-xl border border-[#2563EB]/10 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h1 className="text-[22px] font-medium text-[#1E293B]">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] text-[#64748B]">
                <span className="flex items-center gap-1.5">
                  <Building2 size={14} strokeWidth={2} />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} strokeWidth={2} />
                  {job.location}
                </span>
                <span className="bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full text-[11px] border border-[#2563EB]/15">
                  {job.type || 'Full-time'}
                </span>
              </div>
            </div>
          </div>

          {job.salary && (
            <div className="mb-4 px-4 py-3 bg-[#EFF6FF] rounded-lg">
              <span className="text-[13px] text-[#64748B]">Salary: </span>
              <span className="text-[14px] font-medium text-[#0F172A]">{job.salary}</span>
            </div>
          )}

          <div className="prose-sm text-[14px] text-[#1E293B] leading-relaxed whitespace-pre-wrap mb-6">
            {job.description}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-[#EFF6FF]">
            <p className="text-[12px] text-[#64748B]">
              Posted {formatDate(job.createdAt)}
              {job.postedBy?.name && ` by ${job.postedBy.name}`}
            </p>
            <Button id="apply-btn" size="md">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default JobDetailPage;
