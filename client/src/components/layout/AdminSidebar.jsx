import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, MessageSquare, Pencil, LogOut } from 'lucide-react';

const sidebarItems = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} strokeWidth={2} />, end: true },
  { to: '/admin/users', label: 'Users', icon: <Users size={18} strokeWidth={2} /> },
  { to: '/admin/grievances', label: 'Grievances', icon: <MessageSquare size={18} strokeWidth={2} /> },
  { to: '/admin/jobs', label: 'Module Manager', icon: <Pencil size={18} strokeWidth={2} /> },
];

const AdminSidebar = ({ mobileOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#EAF3DE]">
        <span className="text-[16px] font-medium text-[#27500A]">VillageConnect</span>
        <p className="text-[11px] text-[#5F5E5A] mt-0.5">Admin Panel</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all
              ${isActive
                ? 'bg-[#EAF3DE] text-[#27500A] border-l-[3px] border-l-[#3B6D11] pl-[9px]'
                : 'text-[#5F5E5A] hover:bg-[#EAF3DE]/60 hover:text-[#3B6D11]'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-[#EAF3DE]">
        <div className="flex items-center gap-2.5 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#3B6D11] text-white text-[12px] font-medium flex items-center justify-center flex-shrink-0">
            {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#2C2C2A] truncate">{user?.name}</p>
            <p className="text-[11px] text-[#5F5E5A] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-[#E24B4A] hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-white border-r border-[#EAF3DE] h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
          <aside className="fixed left-0 top-0 h-full w-[240px] bg-white z-50 lg:hidden flex flex-col shadow-xl">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default AdminSidebar;
