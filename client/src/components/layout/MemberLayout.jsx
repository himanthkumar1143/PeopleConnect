import Navbar from './Navbar';
import Footer from './Footer';

const MemberLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
    <Navbar />
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-fade-in-up">
      {children}
    </main>
    <Footer />
  </div>
);

export default MemberLayout;
