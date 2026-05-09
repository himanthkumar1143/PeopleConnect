import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ServiceCard from '../components/cards/ServiceCard';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { Briefcase, Leaf, Activity, BookOpen, MessageSquare } from 'lucide-react';

const services = [
  {
    id: 'home-jobs',
    icon: <Briefcase size={22} strokeWidth={1.8} />,
    title: 'Rural Jobs',
    description: 'Browse local job openings and employment opportunities in your area.',
    link: '/jobs',
  },
  {
    id: 'home-agriculture',
    icon: <Leaf size={22} strokeWidth={1.8} />,
    title: 'Agriculture',
    description: 'Farming tips, crop advice, and government schemes to improve your yield.',
    link: '/agriculture',
  },
  {
    id: 'home-healthcare',
    icon: <Activity size={22} strokeWidth={1.8} />,
    title: 'Healthcare',
    description: 'Access health services, clinics, and wellness information near you.',
    link: '/healthcare',
  },
  {
    id: 'home-education',
    icon: <BookOpen size={22} strokeWidth={1.8} />,
    title: 'Education',
    description: 'Learning resources, courses, and scholarships for rural students.',
    link: '/education',
  },
  {
    id: 'home-grievance',
    icon: <MessageSquare size={22} strokeWidth={1.8} />,
    title: 'Grievance',
    description: 'Submit complaints and track their resolution status transparently.',
    link: '/grievance',
  },
];

const steps = [
  { n: '1', title: 'Register', desc: 'Create a free account in seconds — just name, email, and password.' },
  { n: '2', title: 'Access Services', desc: 'Browse jobs, agriculture tips, healthcare info, and education resources.' },
  { n: '3', title: 'Submit Grievance', desc: 'File complaints and track their progress until fully resolved.' },
];

const HomePage = () => {
  const { ref: heroRef, isIntersecting: heroVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: featuresRef, isIntersecting: featuresVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { ref: stepsRef, isIntersecting: stepsVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EFE8]">
      <Navbar />

      {/* Hero */}
      <section id="hero" ref={heroRef} className="relative overflow-hidden bg-white border-b border-[#EAF3DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-6">
          {/* Decorative leaf */}
          <div className={`w-16 h-16 rounded-2xl bg-[#EAF3DE] flex items-center justify-center mb-2 shadow-[var(--shadow-subtle)] transform hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-out ${heroVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Leaf size={32} color="#3B6D11" strokeWidth={1.8} />
          </div>

          <div className={heroVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2C2C2A] leading-tight tracking-tight">
              Your village.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B6D11] to-[#639922]">Connected.</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-[16px] text-[#5F5E5A] leading-relaxed">
              VillageConnect brings essential services — jobs, agriculture, healthcare, education and
              grievance redressal — directly to every rural household.
            </p>
          </div>

        <div className={`flex flex-col sm:flex-row gap-4 mt-4 ${heroVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <Link
            to="/register"
            id="hero-register-btn"
            className="px-8 py-3.5 bg-[#3B6D11] text-white text-[15px] font-medium rounded-xl hover:bg-[#27500A] shadow-[var(--shadow-btn)] hover:shadow-[var(--shadow-btn-hover)] hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            Get Started — It's Free
          </Link>
          <a
            href="#features"
            id="hero-learn-btn"
            className="px-8 py-3.5 bg-[#EAF3DE] text-[#3B6D11] text-[15px] font-medium rounded-xl hover:bg-[#FAFCF7] border border-[#3B6D11]/20 shadow-sm hover:shadow-[var(--shadow-subtle)] hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            Learn More ↓
          </a>
        </div>

        {/* Admin entry */}
        <p className={`text-[13px] text-[#9e9d99] ${heroVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          Are you an admin?{' '}
          <Link
            to="/admin-login"
            id="hero-admin-login-link"
            className="text-[#3B6D11] font-medium hover:text-[#27500A] underline underline-offset-2"
          >
            Admin Login →
          </Link>
        </p>

        {/* Stats row */}
        <div className={`flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-[#EAF3DE] w-full ${heroVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          {[['5 Modules', 'All essential services'], ['100% Free', 'For all villagers'], ['Secure', 'JWT-protected data']].map(([val, label], idx) => (
            <div key={val} className="text-center" style={{ animationDelay: `${idx * 100}ms` }}>
              <p className="text-[20px] font-medium text-[#3B6D11]">{val}</p>
              <p className="text-[13px] text-[#5F5E5A]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className={`text-center mb-10 ${featuresVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-[26px] sm:text-[30px] font-medium text-[#2C2C2A]">Everything your village needs</h2>
        <p className="text-[15px] text-[#5F5E5A] mt-2">Five modules, one platform, zero complexity.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, idx) => (
          <div key={s.id} className={featuresVisible ? 'animate-slide-up' : 'opacity-0'} style={{ animationDelay: `${idx * 100}ms` }}>
            <ServiceCard {...s} />
          </div>
        ))}
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" ref={stepsRef} className="bg-white border-y border-[#EAF3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className={`text-center mb-12 ${stepsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-[26px] sm:text-[30px] font-medium text-[#2C2C2A]">How it works</h2>
          <p className="text-[15px] text-[#5F5E5A] mt-2">Three simple steps to get started.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.n} className={`flex-1 flex flex-col items-center text-center relative ${stepsVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${idx * 150}ms` }}>
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-[#EAF3DE] z-0" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#EAF3DE] shadow-[var(--shadow-subtle)] border border-[#3B6D11]/10 flex items-center justify-center text-[22px] font-semibold text-[#3B6D11] mb-5 transform hover:scale-110 transition-transform duration-300 ease-out">
                {step.n}
              </div>
              <h3 className="text-[16px] font-medium text-[#2C2C2A]">{step.title}</h3>
              <p className="text-[13px] text-[#5F5E5A] mt-2 max-w-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${stepsVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <Link
            to="/register"
            className="inline-flex px-8 py-3.5 bg-[#3B6D11] text-white text-[15px] font-medium rounded-xl hover:bg-[#27500A] shadow-[var(--shadow-btn)] hover:shadow-[var(--shadow-btn-hover)] hover:-translate-y-[1px] active:translate-y-[1px] transition-all duration-300 ease-out"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default HomePage;
