import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth.api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Users, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const RegisterPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      showToast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#2563EB] transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={2} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </div>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] flex items-center justify-center mx-auto mb-3 shadow-[var(--shadow-subtle)] transform hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-out">
            <Users size={28} color="#2563EB" strokeWidth={2} />
          </div>
          <h1 className="text-[22px] font-medium text-[#1E293B]">Create your account</h1>
          <p className="text-[14px] text-[#64748B] mt-1">Join PeopleConnect today</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#2563EB]/15 shadow-[var(--shadow-card)] p-6 sm:p-8 hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
          {apiError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-[#E24B4A]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="reg-name"
              label="Full Name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              id="reg-email"
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
              id="reg-password"
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              rightElement={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-[#9e9d99] hover:text-[#64748B]" tabIndex={-1}>
                  {showPass ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )}
                </button>
              }
            />

            <Input
              id="reg-confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />



            <Button
              id="register-submit-btn"
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-[13.5px] text-[#64748B] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563EB] font-medium hover:text-[#0F172A] underline decoration-2 decoration-transparent hover:decoration-[#2563EB]/30 transition-all underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
