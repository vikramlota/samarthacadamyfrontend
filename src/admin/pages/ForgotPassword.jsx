import { useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await adminApi.post('/auth/forgot-password', { email });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email and we'll send reset instructions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="inline-flex w-14 h-14 bg-green-100 rounded-full items-center justify-center text-green-500 text-2xl">
                <FaCheckCircle />
              </div>
              <p className="text-gray-700 text-sm">
                If an account exists for <strong>{email}</strong>, a reset link has been sent.
                Check your inbox (and spam folder).
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
              >
                <FaArrowLeft className="text-xs" /> Back to login
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
                label="Email address"
                type="email"
                icon={FaEnvelope}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={isSubmitting}>
                Send Reset Link
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
