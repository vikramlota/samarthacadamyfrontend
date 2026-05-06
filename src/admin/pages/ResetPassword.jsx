import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { adminApi } from '../lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      await adminApi.post('/auth/reset-password', { token, newPassword });
      navigate('/login', { state: { message: 'Password updated. Please sign in.' } });
    } catch (err) {
      setError(err.message || 'Reset failed — token may be expired');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Set New Password</h1>
          <p className="text-sm text-gray-500 mt-1">Choose a strong password</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {!token ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-red-600">Invalid or missing reset token.</p>
              <Link to="/forgot-password" className="text-sm text-red-500 hover:text-red-700">
                Request a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <Input
                label="New Password"
                type="password"
                icon={FaLock}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                helperText="Minimum 8 characters"
                required
                autoFocus
              />
              <Input
                label="Confirm Password"
                type="password"
                icon={FaLock}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={isSubmitting}>
                Update Password
              </Button>
              <div className="text-center">
                <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
                  <FaArrowLeft className="text-xs" /> Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
