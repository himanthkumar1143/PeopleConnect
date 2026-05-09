const statusMap = {
  pending:     { bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-200',  label: 'Pending' },
  'in-progress': { bg: 'bg-blue-50',  text: 'text-blue-700',   border: 'border-blue-200',   label: 'In Progress' },
  resolved:    { bg: 'bg-[#EAF3DE]',  text: 'text-[#27500A]',  border: 'border-[#3B6D11]/20', label: 'Resolved' },
  admin:       { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200', label: 'Admin' },
  villager:    { bg: 'bg-gray-100',   text: 'text-gray-600',   border: 'border-gray-200',   label: 'Villager' },
  tip:         { bg: 'bg-[#EAF3DE]',  text: 'text-[#27500A]',  border: 'border-[#3B6D11]/20', label: 'Tip' },
  scheme:      { bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-200',  label: 'Scheme' },
};

const Badge = ({ status, label: customLabel, className = '' }) => {
  const styles = statusMap[status] || {
    bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: status,
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 text-[12px] font-medium
        rounded-full border shadow-sm backdrop-blur-sm bg-opacity-80
        ${styles.bg} ${styles.text} ${styles.border}
        ${className}
      `}
    >
      {customLabel || styles.label}
    </span>
  );
};

export default Badge;
