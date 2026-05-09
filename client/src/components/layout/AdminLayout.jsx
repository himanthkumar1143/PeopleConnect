import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F1EFE8] overflow-hidden">
      <AdminSidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
          title={pageTitle}
        />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 animate-fade-in-up">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
