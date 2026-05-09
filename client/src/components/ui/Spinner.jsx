const sizeMap = {
  sm: 16,
  md: 24,
  lg: 40,
};

const Spinner = ({ size = 'md', color = 'currentColor', className = '', variant = 'default' }) => {
  const px = sizeMap[size] || sizeMap.md;

  if (variant === 'dots') {
    return (
      <div className={`flex gap-1 items-center ${className}`} aria-label="Loading" role="status">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-[${color}] animate-bounce-subtle`}
            style={{
              width: px / 3,
              height: px / 3,
              backgroundColor: color,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={`rounded-full animate-pulse-soft ${className}`}
        style={{
          width: px,
          height: px,
          backgroundColor: color,
        }}
        aria-label="Loading"
        role="status"
      />
    );
  }

  if (variant === 'ring') {
    return (
      <div
        className={`rounded-full border-2 border-t-transparent animate-spin ${className}`}
        style={{
          width: px,
          height: px,
          borderColor: color,
          borderTopColor: 'transparent',
        }}
        aria-label="Loading"
        role="status"
      />
    );
  }

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className={`animate-spin shrink-0 ${className}`}
      aria-label="Loading"
      role="status"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke={color}
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
