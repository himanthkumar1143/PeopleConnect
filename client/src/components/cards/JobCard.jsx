import { Link } from 'react-router-dom';
import { Building2, MapPin, ChevronRight } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="
    group bg-white rounded-xl border border-[#3B6D11]/10 shadow-[var(--shadow-subtle)]
    p-5 flex flex-col gap-3 relative overflow-hidden
    hover:border-[#3B6D11]/30 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 ease-out
  ">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#EAF3DE]/60 to-transparent rounded-full blur-xl -mr-6 -mt-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-start justify-between gap-2 relative z-10">
      <h3 className="text-[15.5px] font-medium text-[#2C2C2A] leading-snug group-hover:text-[#3B6D11] transition-colors">{job.title}</h3>
      {job.type && (
        <span className="shrink-0 text-[11px] bg-[#EAF3DE] text-[#3B6D11] px-2 py-0.5 rounded-full border border-[#3B6D11]/15 shadow-sm">
          {job.type}
        </span>
      )}
    </div>

    <div className="flex items-center gap-3 text-[13px] text-[#5F5E5A]">
      <span className="flex items-center gap-1">
        <Building2 size={13} strokeWidth={2} />
        {job.company}
      </span>
      <span className="flex items-center gap-1">
        <MapPin size={13} strokeWidth={2} />
        {job.location}
      </span>
    </div>

    <p className="text-[13px] text-[#5F5E5A] leading-relaxed line-clamp-2">{job.description}</p>

    <Link
      to={`/jobs/${job._id}`}
      className="mt-auto self-start text-[13.5px] font-medium text-[#3B6D11] flex items-center gap-1 group-hover:translate-x-1 transition-all duration-300 ease-out relative z-10"
    >
      View Details
      <ChevronRight size={14} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300 ease-out" />
    </Link>
  </div>
);

export default JobCard;
