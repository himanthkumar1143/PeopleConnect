import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Leaf, ChevronDown, X, Menu, User, LayoutDashboard, LogOut, Moon, Sun } from 'lucide-react';

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/agriculture', label: 'Agriculture' },
  { to: '/healthcare', label: 'Healthcare' },
  { to: '/education', label: 'Education' },
  { to: '/grievance', label: 'Grievance' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAF3DE]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <Leaf size={22} color="#3B6D11" strokeWidth={2} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-[17px] font-medium text-[#27500A] tracking-tight group-hover:text-[#3B6D11] transition-colors">VillageConnect</span>
        </Link>

        {/* Desktop Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3.5 py-1.5 text-[14px] transition-colors group ${
                    isActive
                      ? 'text-[#3B6D11] font-medium'
                      : 'text-[#5F5E5A] hover:text-[#3B6D11]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    <span 
                      className={`absolute bottom-[2px] left-3 right-3 h-[2px] bg-[#3B6D11] rounded-t-sm transform origin-left transition-transform duration-300 ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                    <span 
                      className={`absolute inset-0 bg-[#EAF3DE]/40 rounded-lg transform transition-all duration-300 ease-out z-0 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleDark}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#EAF3DE] text-[#5F5E5A] hover:text-[#3B6D11] transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>

          {user ? (
            <div className="relative">
              <button
                id="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#EAF3DE] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#3B6D11] text-white text-[12px] font-medium flex items-center justify-center">
                  {initials}
                </div>
                <span className="hidden sm:block text-[13px] font-medium text-[#2C2C2A] max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown size={14} strokeWidth={2} />
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#EAF3DE] shadow-lg z-20 py-1 animate-scale-in">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#2C2C2A] hover:bg-[#EAF3DE] transition-all duration-200 hover:translate-x-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={15} strokeWidth={2} />
                      My Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#2C2C2A] hover:bg-[#EAF3DE] transition-all duration-200 hover:translate-x-1"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={15} strokeWidth={2} />
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-[#EAF3DE] mt-1 pt-1">
                      <button
                        id="logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#E24B4A] hover:bg-red-50 transition-all duration-200 hover:translate-x-1"
                      >
                        <LogOut size={15} strokeWidth={2} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-[14px] font-medium text-[#3B6D11] hover:bg-[#EAF3DE] rounded-lg transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 text-[14px] font-medium bg-[#3B6D11] text-white rounded-lg hover:bg-[#27500A] transition-colors">
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#EAF3DE] text-[#5F5E5A] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#EAF3DE] bg-white px-4 py-3 flex flex-col gap-1 animate-slide-in-left">
          {user ? (
            <>
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-[14px] rounded-lg transition-all duration-200 ${
                      isActive ? 'text-[#3B6D11] font-medium bg-[#EAF3DE]' : 'text-[#5F5E5A] hover:bg-[#EAF3DE]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-[#EAF3DE] pt-2 mt-1 flex flex-col gap-1">
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[14px] text-[#2C2C2A] rounded-lg hover:bg-[#EAF3DE] transition-colors">
                  My Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[14px] text-[#2C2C2A] rounded-lg hover:bg-[#EAF3DE] transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="px-3 py-2.5 text-[14px] text-[#E24B4A] rounded-lg hover:bg-red-50 text-left transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-[14px] font-medium text-center text-[#3B6D11] border border-[#3B6D11] rounded-lg hover:bg-[#EAF3DE] transition-colors">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-[14px] font-medium text-center bg-[#3B6D11] text-white rounded-lg hover:bg-[#27500A] transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
