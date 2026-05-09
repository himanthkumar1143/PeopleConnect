import { useEffect, useState } from 'react';

const PageTransition = ({ children, className = '', animation = 'fade-in-up' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up-enhanced',
    'slide-up': 'animate-slide-up',
    'scale-in': 'animate-scale-in',
    'slide-in-right': 'animate-slide-in-right',
    'slide-in-left': 'animate-slide-in-left',
    'blur-in': 'animate-blur-in',
  };

  return (
    <div
      className={`${animationClasses[animation] || animationClasses['fade-in-up']} ${className}`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
