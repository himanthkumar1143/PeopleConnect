import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';

const EducationCard = ({ resource }) => (
  <div className="
    group bg-white rounded-xl border border-[#3B6D11]/10 shadow-[var(--shadow-subtle)]
    p-5 flex flex-col gap-3 relative overflow-hidden
    hover:border-[#3B6D11]/30 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 ease-out
  ">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EAF3DE]/60 to-transparent rounded-full blur-xl -mr-6 -mt-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-start justify-between gap-2 relative z-10">
      <div className="flex-1">
        <h3 className="text-[15.5px] font-medium text-[#2C2C2A] leading-snug group-hover:text-[#3B6D11] transition-colors">{resource.title}</h3>
        <p className="text-[13px] text-[#5F5E5A] mt-0.5">{resource.courseName}</p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-400 shrink-0">
        <BookOpen size={16} strokeWidth={2} />
      </div>
    </div>

    {resource.description && (
      <p className="text-[13px] text-[#5F5E5A] leading-relaxed line-clamp-2">{resource.description}</p>
    )}

    <Link
      to={`/education/${resource._id}`}
      className="mt-auto self-start text-[13.5px] font-medium text-[#3B6D11] flex items-center gap-1 group-hover:translate-x-1 transition-all duration-300 ease-out relative z-10"
    >
      View Details
      <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300 ease-out" />
    </Link>
  </div>
);

export default EducationCard;
