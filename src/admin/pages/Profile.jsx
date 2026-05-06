import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../lib/api';
import { useToast } from '../components/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

export default function Profile() {
  const { user, reload } = useAuth();
  const toast = useToast();

  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError('');
    if (newPwd.length < 8) { setPwdError('Min 8 characters'); return; }
    if (newPwd !== confirm) { setPwdError('Passwords do not match'); return; }
    setSaving(true);
    try {
      await adminApi.post('/auth/change-password', { currentPassword: current, newPassword: newPwd });
      toast.success('Password changed successfully');
      setCurrent(''); setNewPwd(''); setConfirm('');
    } catch (err) {
      setPwdError(err.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      {/* User info card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              user?.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Last Login</p>
            <p className="text-gray-700">
              {user?.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString('en-IN')
                : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Member Since</p>
            <p className="text-gray-700">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-IN')
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <FaShieldAlt className="text-red-500" />
          <h3 className="font-semibold text-gray-900">Change Password</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {pwdError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {pwdError}
            </div>
          )}
          <Input
            label="Current Password"
            type="password"
            icon={FaLock}
            value={current}
            onChange={e => setCurrent(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            icon={FaLock}
            value={newPwd}
            onChange={e => setNewPwd(e.target.value)}
            helperText="Minimum 8 characters"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            icon={FaLock}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
          />
          <div className="pt-1">
            <Button type="submit" variant="primary" loading={saving}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
