const Card = ({ children, className = '', padding = 'p-5', hoverEffect = false }) => (
  <div
    className={`
      bg-white rounded-xl border border-[#2563EB]/10 shadow-[var(--shadow-subtle)]
      ${hoverEffect ? 'hover:shadow-[var(--shadow-card)] hover:-translate-y-[2px] transition-all duration-300 ease-out' : ''}
      ${padding} ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
