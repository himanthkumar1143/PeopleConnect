import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Leaf, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
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
      login(data.user, data.token);
      showToast('Welcome back!', 'success');
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
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
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#5F5E5A] hover:text-[#3B6D11] transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </div>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3DE] flex items-center justify-center mx-auto mb-3 shadow-[var(--shadow-subtle)] transform hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-out">
            <Leaf size={28} color="#3B6D11" strokeWidth={2} />
          </div>
          <h1 className="text-[22px] font-medium text-[#2C2C2A]">Welcome back</h1>
          <p className="text-[14px] text-[#5F5E5A] mt-1">Sign in to your VillageConnect account</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#3B6D11]/15 shadow-[var(--shadow-card)] p-6 sm:p-8 hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
          {apiError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-[#E24B4A]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="login-email"
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="login-password"
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
              id="login-submit-btn"
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-[13.5px] text-[#5F5E5A] mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3B6D11] font-medium hover:text-[#27500A] underline decoration-2 decoration-transparent hover:decoration-[#3B6D11]/30 transition-all underline-offset-4">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
