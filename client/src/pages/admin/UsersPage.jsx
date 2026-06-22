import { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/user.api';
import { useToast } from '../../context/ToastContext';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { SkeletonRow } from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';

const UsersPage = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    getAllUsers()
      .then(({ data }) => setUsers(data.users || []))
      .catch(() => showToast('Failed to load users', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <AdminLayout pageTitle="Users">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            id="users-search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <select
            id="users-role-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 text-[14px] bg-white border border-[#d4d0c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] text-[#1E293B] sm:w-[160px]"
          >
            <option value="all">All Roles</option>
            <option value="member">Community Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-[#2563EB]/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EFF6FF] flex items-center justify-between">
            <h2 className="text-[15px] font-medium text-[#1E293B]">
              All Users {!loading && <span className="text-[#64748B] font-normal text-[13px]">({filtered.length})</span>}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left px-5 py-3 font-medium text-[#64748B]">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-[#64748B]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFF6FF]">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-[#64748B]">No users match your filters.</td>
                  </tr>
                ) : filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F8FAFC]/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-[#1E293B]">{u.name}</td>
                    <td className="px-4 py-3 text-[#64748B]">{u.email}</td>
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

export default UsersPage;
