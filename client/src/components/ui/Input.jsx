import { useState, useEffect } from 'react';

const Input = ({
  label,
  error,
  isValid,
  id,
  type = 'text',
  className = '',
  containerClass = '',
  rightElement,
  floating = false,
  ...props
}) => {
  const [shake, setShake] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (error) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  const labelFloat = floating && (isFocused || hasValue || props.value);

  return (
    <div className={`flex flex-col gap-1 ${containerClass}`}>
      {label && !floating && (
        <label
          htmlFor={id}
          className="text-[13px] font-medium text-[#2C2C2A] transition-colors duration-200"
        >
          {label}
        </label>
      )}
      <div className={`relative ${shake ? 'animate-shake' : ''}`}>
        <input
          id={id}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`
            w-full px-3.5 py-2.5 text-[14px] text-[#2C2C2A]
            bg-white border rounded-lg transition-all duration-300 ease-out shadow-sm
            placeholder:text-[#9e9d99]
            focus:outline-none focus:ring-4 focus:ring-[var(--shadow-input-focus)] focus:border-[#3B6D11]
            ${error ? 'border-[#E24B4A] focus:ring-[#E24B4A]/20 bg-red-50/30' : isValid ? 'border-[#639922] focus:ring-[#639922]/20 bg-[#EAF3DE]/30' : 'border-[#d4d0c8] hover:border-[#3B6D11]/50'}
            ${rightElement ? 'pr-10' : isValid ? 'pr-10' : ''}
            ${floating ? 'pt-6' : ''}
            ${className}
          `}
          {...props}
        />
        {label && floating && (
          <label
            htmlFor={id}
            className={`
              absolute left-3.5 transition-all duration-300 ease-out pointer-events-none
              ${labelFloat 
                ? 'top-1.5 text-[11px] text-[#3B6D11] font-medium' 
                : 'top-2.5 text-[14px] text-[#9e9d99]'
              }
              ${isFocused ? 'text-[#3B6D11]' : ''}
            `}
          >
            {label}
          </label>
        )}
        {rightElement ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        ) : isValid ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#639922] animate-scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
        ) : null}
      </div>
      {error && (
        <p className="text-[12px] text-[#E24B4A] mt-0.5 animate-fade-in-up">{error}</p>
      )}
    </div>
  );
};

export default Input;
