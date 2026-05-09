import { useState, useEffect } from 'react';
import { getMe, updateProfile } from '../../api/auth.api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const ProfilePage = () => {
  const { user, login, token } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getMe()
      .then(({ data }) => setName(data.user?.name || ''))
      .catch(() => showToast('Failed to load profile', 'error'))
      .finally(() => setFetching(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setNameError('Name is required');
    setNameError('');
    setLoading(true);
    try {
      const { data } = await updateProfile({ name: name.trim() });
      login(data.user, token);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <VillagerLayout>
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-[22px] font-medium text-[#2C2C2A]">My Profile</h1>
          <p className="text-[14px] text-[#5F5E5A] mt-1">Manage your account information</p>
        </div>

        {/* Avatar card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#3B6D11]/10 p-6 mb-5 flex items-center gap-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-[#3B6D11] text-white text-[22px] font-medium flex items-center justify-center flex-shrink-0 shadow-[var(--shadow-btn)] group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
            {initials}
          </div>
          <div>
            <p className="text-[16px] font-medium text-[#2C2C2A]">{user?.name}</p>
            <p className="text-[13px] text-[#5F5E5A]">{user?.email}</p>
            <Badge status={user?.role} className="mt-2" />
          </div>
        </div>

        {/* Edit form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#3B6D11]/10 p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-[15px] font-medium text-[#2C2C2A] mb-4">Edit Information</h2>
          {fetching ? (
            <div className="space-y-3">
              <div className="skeleton h-4 w-16" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <Input
                id="profile-name"
                label="Full Name"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(''); }}
                error={nameError}
                placeholder="Your full name"
              />
              <div>
                <label className="text-[13px] font-medium text-[#2C2C2A] block mb-1">Email</label>
                <p className="px-3 py-2.5 bg-[#F1EFE8] rounded-lg text-[14px] text-[#5F5E5A] border border-[#d4d0c8]">
                  {user?.email}
                </p>
                <p className="text-[12px] text-[#9e9d99] mt-1">Email cannot be changed</p>
              </div>
              <Button
                id="profile-save-btn"
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Save Changes
              </Button>
            </form>
          )}
        </div>
      </div>
    </VillagerLayout>
  );
};

export default ProfilePage;
