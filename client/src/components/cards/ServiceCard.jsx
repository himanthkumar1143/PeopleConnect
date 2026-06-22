import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ icon, title, description, link, id }) => {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };

  return (
    <Link
      to={link}
      id={id}
      className="
        group flex flex-col gap-3 p-6 bg-white rounded-xl
        border border-[#2563EB]/10 shadow-[var(--shadow-card)]
        hover:border-[#2563EB]/30 hover:bg-[#F8FAFC]
        hover:shadow-[var(--shadow-card-hover)]
        transition-all duration-300 ease-out preserve-3d
      "
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-[16px] font-medium text-[#1E293B] group-hover:text-[#2563EB] transition-colors">{title}</h3>
        <p className="text-[13.5px] text-[#64748B] mt-1.5 leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-2 flex items-center gap-1.5 text-[13.5px] text-[#2563EB] font-medium group-hover:translate-x-1 transition-transform duration-300">
        View Module
        <ChevronRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default ServiceCard;
