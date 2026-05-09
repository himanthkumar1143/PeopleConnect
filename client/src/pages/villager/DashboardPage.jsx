import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchMyGrievances } from '../../api/grievance.api';
import VillagerLayout from '../../components/layout/VillagerLayout';
import ServiceCard from '../../components/cards/ServiceCard';
import GrievanceCard from '../../components/cards/GrievanceCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { Briefcase, Leaf, Activity, BookOpen, MessageSquare } from 'lucide-react';

const services = [
  {
    id: 'dash-jobs',
    icon: <Briefcase size={22} strokeWidth={1.8} />,
    title: 'Rural Jobs',
    description: 'Find local employment opportunities.',
    link: '/jobs',
  },
  {
    id: 'dash-agriculture',
    icon: <Leaf size={22} strokeWidth={1.8} />,
    title: 'Agriculture',
    description: 'Farming tips and schemes.',
    link: '/agriculture',
  },
  {
    id: 'dash-healthcare',
    icon: <Activity size={22} strokeWidth={1.8} />,
    title: 'Healthcare',
    description: 'Access health and wellness info.',
    link: '/healthcare',
  },
  {
    id: 'dash-education',
    icon: <BookOpen size={22} strokeWidth={1.8} />,
    title: 'Education',
    description: 'Learning resources and courses.',
    link: '/education',
  },
  {
    id: 'dash-grievance',
    icon: <MessageSquare size={22} strokeWidth={1.8} />,
    title: 'Grievance',
    description: 'File complaints and track resolution status.',
    link: '/grievance',
  },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [latestGrievance, setLatestGrievance] = useState(null);
  const [grievanceLoading, setGrievanceLoading] = useState(true);
  const { ref: bannerRef, isIntersecting: bannerVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: servicesRef, isIntersecting: servicesVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: activityRef, isIntersecting: activityVisible } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    fetchMyGrievances()
      .then(({ data }) => setLatestGrievance(data.grievances?.[0] || null))
      .catch(() => {})
      .finally(() => setGrievanceLoading(false));
  }, []);

  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <VillagerLayout>
      {/* Welcome Banner */}
      <div ref={bannerRef} className={`bg-white/95 backdrop-blur-md rounded-2xl border border-[#3B6D11]/15 shadow-[var(--shadow-card)] p-6 sm:p-8 mb-6 relative overflow-hidden group hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 ${bannerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#EAF3DE] to-[#3B6D11]/10 rounded-full blur-3xl opacity-60 -mr-10 -mt-10 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10">
          <p className="text-[13px] text-[#3B6D11] font-medium tracking-wide uppercase mb-1.5">{today}</p>
          <h1 className="text-[26px] sm:text-[30px] font-semibold text-[#2C2C2A] leading-tight">
            {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B6D11] to-[#639922]">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-[15px] text-[#5F5E5A] mt-2.5 max-w-xl leading-relaxed">
            Welcome to your VillageConnect dashboard. Access essential services, stay updated with local news, and track your requests below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div ref={servicesRef} className="lg:col-span-2 space-y-6">
          <h2 className={`text-[16px] font-medium text-[#2C2C2A] px-1 ${servicesVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>Essential Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, idx) => (
              <div key={s.id} className={servicesVisible ? 'animate-slide-up' : 'opacity-0'} style={{ animationDelay: `${idx * 100}ms` }}>
                <ServiceCard {...s} />
              </div>
            ))}
          </div>
        </div>

        <div ref={activityRef} className="lg:col-span-1 space-y-6">
          <h2 className={`text-[16px] font-medium text-[#2C2C2A] px-1 ${activityVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>Recent Activity</h2>
          
          <div className={`bg-white rounded-2xl border border-[#3B6D11]/10 p-5 shadow-[var(--shadow-card)] ${activityVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            <h3 className="text-[13px] font-medium text-[#5F5E5A] uppercase tracking-wide mb-4">Latest Grievance</h3>
            {grievanceLoading ? (
              <div className="space-y-3">
                <div className="skeleton-enhanced h-4 w-full" />
                <div className="skeleton-enhanced h-4 w-2/3" />
              </div>
            ) : latestGrievance ? (
              <GrievanceCard grievance={latestGrievance} />
            ) : (
              <div className="text-center py-6 bg-[#F1EFE8]/50 rounded-lg border border-[#EAF3DE]">
                <p className="text-[13px] text-[#5F5E5A]">No active grievances</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </VillagerLayout>
  );
};

export default DashboardPage;
