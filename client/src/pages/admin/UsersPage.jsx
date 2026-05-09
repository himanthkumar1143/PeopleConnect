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
            className="px-3 py-2.5 text-[14px] bg-white border border-[#d4d0c8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11] text-[#2C2C2A] sm:w-[160px]"
          >
            <option value="all">All Roles</option>
            <option value="villager">Villager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-[#3B6D11]/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EAF3DE] flex items-center justify-between">
            <h2 className="text-[15px] font-medium text-[#2C2C2A]">
              All Users {!loading && <span className="text-[#5F5E5A] font-normal text-[13px]">({filtered.length})</span>}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-[#F1EFE8]">
                  <th className="text-left px-5 py-3 font-medium text-[#5F5E5A]">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-[#5F5E5A]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAF3DE]">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-[#5F5E5A]">No users match your filters.</td>
                  </tr>
                ) : filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F1EFE8]/50 transition-colors">
                    <td className="px-5 py-3 font-medium text-[#2C2C2A]">{u.name}</td>
                    <td className="px-4 py-3 text-[#5F5E5A]">{u.email}</td>
                    <td className="px-4 py-3"><Badge status={u.role} /></td>
                    <td className="px-4 py-3 text-[#5F5E5A] whitespace-nowrap">{formatDateShort(u.createdAt)}</td>
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
