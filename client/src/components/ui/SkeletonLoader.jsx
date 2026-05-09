const SkeletonLoader = ({ variant = 'default', className = '', lines = 3 }) => {
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-6 w-1/2',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32 w-full rounded-xl',
    button: 'h-10 w-24 rounded-lg',
    circle: 'h-12 w-12 rounded-full',
    square: 'h-16 w-16 rounded-lg',
  };

  const baseClass = variants[variant] || variants.default;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton-enhanced ${i === lines - 1 ? 'w-1/2' : 'w-full'}`}
            style={{ height: '16px' }}
          />
        ))}
      </div>
    );
  }

  return <div className={`skeleton-enhanced ${baseClass} ${className}`} />;
};

export default SkeletonLoader;
