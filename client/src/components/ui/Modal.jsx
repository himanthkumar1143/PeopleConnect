import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  const modalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative w-full ${maxWidth} bg-white/95 backdrop-blur-xl rounded-2xl shadow-[var(--shadow-card-hover)] border border-[#2563EB]/15 max-h-[90vh] flex flex-col transform transition-all duration-300 ${isAnimating ? 'animate-scale-in' : ''}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF6FF]">
          <h2 id="modal-title" className="text-[16px] font-medium text-[#1E293B]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#64748B] hover:text-[#1E293B] hover:bg-[#EFF6FF] rounded-lg p-1.5 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
