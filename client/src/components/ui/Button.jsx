import { useState, useRef } from 'react';
import Spinner from './Spinner';

const variantStyles = {
  primary: 'bg-[#3B6D11] text-white hover:bg-[#27500A] border border-[#3B6D11] shadow-[var(--shadow-btn)] hover:shadow-[var(--shadow-btn-hover)]',
  secondary: 'bg-[#EAF3DE] text-[#3B6D11] hover:bg-[#d4e8bf] border border-[#3B6D11]/30 hover:border-[#3B6D11]/50 shadow-sm hover:shadow-[var(--shadow-subtle)]',
  danger: 'bg-[#E24B4A] text-white hover:bg-[#c73c3b] border border-[#E24B4A] shadow-[0_4px_14px_0_rgba(226,75,74,0.2)] hover:shadow-[0_6px_20px_rgba(226,75,74,0.3)]',
  ghost: 'bg-transparent text-[#3B6D11] hover:bg-[#EAF3DE] border border-transparent hover:shadow-[var(--shadow-subtle)]',
  outline: 'bg-transparent text-[#3B6D11] hover:bg-[#EAF3DE] border border-[#3B6D11] hover:shadow-[var(--shadow-subtle)]',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-[13px] rounded-lg',
  md: 'px-4 py-2 text-[14px] rounded-lg',
  lg: 'px-6 py-2.5 text-[15px] rounded-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  enableRipple = true,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    if (!enableRipple || isDisabled) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-300 ease-out cursor-pointer select-none relative overflow-hidden
        hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.98]
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            marginLeft: '-50px',
            marginTop: '-50px',
          }}
        />
      ))}
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;
