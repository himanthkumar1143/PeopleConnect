import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4">
    <div className="text-center">
      <p className="text-[100px] sm:text-[120px] font-medium text-[#EAF3DE] leading-none select-none">
        404
      </p>
      <div className="-mt-4">
        <h1 className="text-[24px] font-medium text-[#2C2C2A]">Page not found</h1>
        <p className="text-[15px] text-[#5F5E5A] mt-2 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-[#3B6D11] text-white text-[14px] font-medium rounded-lg hover:bg-[#27500A] transition-colors"
        >
          <Home size={16} strokeWidth={2} />
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
