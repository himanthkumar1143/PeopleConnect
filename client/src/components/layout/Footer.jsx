import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#EAF3DE] mt-auto relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-24 bg-gradient-to-b from-[#EAF3DE]/60 to-transparent blur-3xl opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EAF3DE] flex items-center justify-center text-[#3B6D11] shadow-[var(--shadow-subtle)]">
            <Leaf size={16} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-[15px] font-semibold text-[#27500A] tracking-tight block leading-none mb-1">VillageConnect</span>
            <p className="text-[12px] text-[#9e9d99] flex items-center gap-1">
              © {new Date().getFullYear()} Made with <Heart size={11} className="text-[#E24B4A] fill-[#E24B4A]/20" />
            </p>
          </div>
        </div>

        {/* Essential Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
          {[
            { name: 'Jobs', path: '/jobs' },
            { name: 'Agriculture', path: '/agriculture' },
            { name: 'Healthcare', path: '/healthcare' },
            { name: 'Education', path: '/education' },
            { name: 'Grievance', path: '/grievance' },
          ].map(link => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-[13px] font-medium text-[#5F5E5A] hover:text-[#3B6D11] transition-colors"
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
