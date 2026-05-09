import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      const { data } = await loginUser(form);

      // Check role BEFORE storing auth — reject non-admins
      if (data.user.role !== 'admin') {
        setApiError('Access denied. This login is for administrators only.');
        showToast('Access denied — not an admin account.', 'error');
        return;
      }

      login(data.user, data.token);
      showToast('Welcome, Admin!', 'success');
      navigate('/admin');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
      setApiError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo + Badge */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-[#27500A] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Lock size={26} color="#ffffff" strokeWidth={2} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#27500A]/10 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6D11] inline-block" />
            <span className="text-[12px] font-medium text-[#27500A] tracking-wide uppercase">Admin Access</span>
          </div>
          <h1 className="text-[22px] font-medium text-[#2C2C2A]">Admin Login</h1>
          <p className="text-[14px] text-[#5F5E5A] mt-1">Sign in to the VillageConnect admin panel</p>
        </div>

        <div className="bg-white rounded-xl border border-[#27500A]/15 p-6 sm:p-8 shadow-sm">
          {apiError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-[#E24B4A]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="admin-login-email"
              label="Admin Email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="admin-login-password"
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-[#9e9d99] hover:text-[#5F5E5A] transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )}
                </button>
              }
            />

            <Button
              id="admin-login-submit-btn"
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
              className="w-full mt-2 !bg-[#27500A] hover:!bg-[#1a3a07]"
            >
              Sign In as Admin
            </Button>
          </form>

          <p className="text-center text-[13px] text-[#5F5E5A] mt-5">
            Not an admin?{' '}
            <Link to="/login" className="text-[#3B6D11] font-medium hover:text-[#27500A]">
              Villager login
            </Link>
            {' '}·{' '}
            <Link to="/" className="text-[#3B6D11] font-medium hover:text-[#27500A]">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
