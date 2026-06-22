import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllGrievances } from '../../api/grievance.api';
import { getAllUsers } from '../../api/user.api';
import { fetchJobs } from '../../api/job.api';
import { useToast } from '../../context/ToastContext';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/ui/Badge';
import { SkeletonRow } from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';
import { Users, MessageSquare, Clock, Briefcase } from 'lucide-react';

const StatCard = ({ label, value, icon, loading }) => (
  <div className="bg-white rounded-2xl border border-[#2563EB]/10 p-5 flex items-center gap-4 shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-card)] hover:-translate-y-[1px] transition-all duration-300 group">
    <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ease-out shadow-sm">
      {icon}
    </div>
    <div>
      {loading ? (
        <div className="skeleton h-6 w-10 mb-1" />
      ) : (
        <p className="text-[22px] font-medium text-[#1E293B]">{value}</p>
      )}
      <p className="text-[12px] text-[#64748B]">{label}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [grievances, setGrievances] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchAllGrievances(),
      getAllUsers(),
      fetchJobs(),
    ])
      .then(([gRes, uRes, jRes]) => {
        setGrievances(gRes.data.grievances || []);
        setUsers(uRes.data.users || []);
        setJobs(jRes.data.jobs || []);
      })
      .catch(() => showToast('Failed to load dashboard data', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const pending = grievances.filter((g) => g.status === 'pending').length;

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={users.length} loading={loading}
            icon={<Users size={18} strokeWidth={2} />}
          />
          <StatCard label="Total Grievances" value={grievances.length} loading={loading}
            icon={<MessageSquare size={18} strokeWidth={2} />}
          />
          <StatCard label="Pending Grievances" value={pending} loading={loading}
            icon={<Clock size={18} strokeWidth={2} />}
          />
          <StatCard label="Total Jobs" value={jobs.length} loading={loading}
            icon={<Briefcase size={18} strokeWidth={2} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Grievances */}
          <div className="bg-white rounded-2xl border border-[#2563EB]/10 overflow-hidden shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF6FF]">
              <h2 className="text-[15px] font-medium text-[#1E293B]">Recent Grievances</h2>
              <Link to="/admin/grievances" className="text-[13px] text-[#2563EB] hover:underline">View all</Link>
            </div>
            <table className="w-full text-[13px]">
              <thead><tr className="bg-[#F8FAFC]">
                <th className="text-left px-5 py-2.5 font-medium text-[#64748B]">Description</th>
                <th className="text-left px-4 py-2.5 font-medium text-[#64748B]">Status</th>
                <th className="text-left px-4 py-2.5 font-medium text-[#64748B]">Date</th>
              </tr></thead>
              <tbody className="divide-y divide-[#EFF6FF]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : grievances.slice(0, 5).map((g) => (
                  <tr key={g._id} className="hover:bg-[#F8FAFC]/50">
                    <td className="px-5 py-3 max-w-[160px]">
                      <p className="truncate text-[#1E293B]">{g.description}</p>
                      <p className="text-[11px] text-[#64748B]">{g.filedBy?.name}</p>
                    </td>
                    <td className="px-4 py-3"><Badge status={g.status} /></td>
                    <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{formatDateShort(g.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-2xl border border-[#2563EB]/10 overflow-hidden shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFF6FF]">
              <h2 className="text-[15px] font-medium text-[#1E293B]">Recent Users</h2>
              <Link to="/admin/users" className="text-[13px] text-[#2563EB] hover:underline">View all</Link>
            </div>
            <table className="w-full text-[13px]">
              <thead><tr className="bg-[#F8FAFC]">
                <th className="text-left px-5 py-2.5 font-medium text-[#64748B]">Name</th>
                <th className="text-left px-4 py-2.5 font-medium text-[#64748B]">Role</th>
                <th className="text-left px-4 py-2.5 font-medium text-[#64748B]">Joined</th>
              </tr></thead>
              <tbody className="divide-y divide-[#EFF6FF]">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                ) : users.slice(0, 5).map((u) => (
                  <tr key={u._id} className="hover:bg-[#F8FAFC]/50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-[#1E293B]">{u.name}</p>
                      <p className="text-[11px] text-[#64748B]">{u.email}</p>
                    </td>
                    <td className="px-4 py-3"><Badge status={u.role} /></td>
                    <td className="px-4 py-3 text-[#64748B] whitespace-nowrap">{formatDateShort(u.createdAt)}</td>
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

export default AdminDashboard;
