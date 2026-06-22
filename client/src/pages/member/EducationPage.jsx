import { useState, useEffect } from 'react';
import { fetchResources } from '../../api/education.api';
import { useToast } from '../../context/ToastContext';
import MemberLayout from '../../components/layout/MemberLayout';
import EducationCard from '../../components/cards/EducationCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { BookOpen } from 'lucide-react';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <BookOpen size={56} strokeWidth={1.5} color="#d4d0c8" className="mb-4" />
    <h3 className="text-[16px] font-medium text-[#1E293B]">No education resources available</h3>
    <p className="text-[13px] text-[#64748B] mt-1">Resources will be added soon.</p>
  </div>
);

const EducationPage = () => {
  const { showToast } = useToast();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources()
      .then(({ data }) => setResources(data.resources || []))
      .catch(() => showToast('Failed to load education resources', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MemberLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#1E293B]">Education</h1>
        <p className="text-[14px] text-[#64748B] mt-1">Courses, scholarships, and learning resources</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : resources.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => <EducationCard key={res._id} resource={res} />)}
        </div>
      )}
    </MemberLayout>
  );
};

export default EducationPage;
