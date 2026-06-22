import Badge from '../ui/Badge';
import { formatDateShort } from '../../utils/formatDate';

const GrievanceCard = ({ grievance }) => (
  <div className="bg-white rounded-xl border border-[#2563EB]/10 p-4 flex flex-col gap-2 shadow-sm hover:shadow-[var(--shadow-subtle)] hover:-translate-y-[1px] transition-all duration-300 ease-out cursor-pointer">
    <p className="text-[14px] text-[#1E293B] line-clamp-2 leading-relaxed font-medium">
      {grievance.description}
    </p>
    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFF6FF]">
      <Badge status={grievance.status} />
      <span className="text-[12px] text-[#64748B]">
        {formatDateShort(grievance.createdAt)}
      </span>
    </div>
  </div>
);

export default GrievanceCard;
