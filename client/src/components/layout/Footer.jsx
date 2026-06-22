import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#EFF6FF] mt-auto relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-24 bg-gradient-to-b from-[#EFF6FF]/60 to-transparent blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shadow-[var(--shadow-subtle)]">
            <Users size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[15px] font-semibold text-[#0F172A] tracking-tight block leading-none">PeopleConnect</span>
          </div>
        </div>

        {/* Essential Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
          {[
            { name: 'Jobs', path: '/jobs' },
            { name: 'Resources', path: '/resources' },
            { name: 'Healthcare', path: '/healthcare' },
            { name: 'Education', path: '/education' },
            { name: 'Grievance', path: '/grievance' },
          ].map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-[13px] font-medium text-[#64748B] hover:text-[#2563EB] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
