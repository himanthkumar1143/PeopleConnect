import { useState, useEffect } from 'react';
import { fetchAllGrievances, updateGrievanceStatus } from '../../api/grievance.api';
import { useToast } from '../../context/ToastContext';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/ui/Badge';
import { SkeletonRow } from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';

const statuses = ['pending', 'in-progress', 'resolved'];

const GrievanceManagement = () => {
  const { showToast } = useToast();
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await fetchAllGrievances();
      setGrievances(data.grievances || []);
    } catch {
      showToast('Failed to load grievances', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const { data } = await updateGrievanceStatus(id, newStatus);
      setGrievances((prev) => prev.map((g) => g._id === id ? data.grievance : g));
      showToast('Status updated successfully', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = statusFilter === 'all' ? grievances : grievances.filter((g) => g.status === statusFilter);

  return (
    <AdminLayout pageTitle="Grievances">
      <div className="space-y-4">
        {/* Filter */}
        <div className="flex items-center gap-3">
          <select
            id="grievance-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-[14px] bg-white border border-[#d4d0c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] text-[#1E293B]"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <span className="text-[13px] text-[#64748B]">
            {!loading && `${filtered.length} grievance${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#2563EB]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left px-5 py-3 font-medium text-[#64748B]">Description</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Filed By</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFF6FF]">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-[#64748B]">No grievances found.</td>
                  </tr>
                ) : filtered.map((g) => (
                  <tr key={g._id} className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="px-5 py-3 max-w-[200px]">
                      <p className="truncate text-[#1E293B]" title={g.description}>{g.description}</p>
                    </td>
                    <td className="px-4 py-3 text-[#64748B]">{g.filedBy?.name || '—'}</td>
                    <td className="px-4 py-3"><Badge status={g.status} /></td>
                    <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{formatDateShort(g.createdAt)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={g.status}
                        disabled={updatingId === g._id}
                        onChange={(e) => handleStatusChange(g._id, e.target.value)}
                        className="px-2 py-1.5 text-[12px] bg-white border border-[#d4d0c8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2563EB]/30 disabled:opacity-50"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GrievanceManagement;
