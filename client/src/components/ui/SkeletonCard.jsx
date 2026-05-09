const SkeletonCard = ({ lines = 3 }) => (
  <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-5 space-y-3">
    <div className="skeleton h-5 w-3/4" />
    <div className="skeleton h-3.5 w-1/3" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`skeleton h-3 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
    <div className="skeleton h-8 w-24 mt-2 rounded-lg" />
  </div>
);

export const SkeletonRow = () => (
  <tr>
    {Array.from({ length: 4 }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="skeleton h-4 w-full rounded" />
      </td>
    ))}
  </tr>
);

export default SkeletonCard;
