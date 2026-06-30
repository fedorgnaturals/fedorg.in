'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';

const passwordRules = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v) => /\d/.test(v) },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agreed) e.agreed = 'You must agree to the terms';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const { token, user } = await authAPI.signup(form.name, form.email, form.password);
      localStorage.setItem('fedorg_token', token);
      localStorage.setItem('fedorg_user', JSON.stringify(user));
      toast.success('Account created! Welcome to FEDORG 🌿');
      router.push('/');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                FED<span className="text-primary-700">ORG</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-500 mt-1 text-sm">Join 12,000+ families eating better</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input type="text" className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="Arjun Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input type="email" className={`input-field ${errors.email ? 'border-red-400' : ''}`} placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPwd ? 'text' : 'password'} className={`input-field pr-10 ${errors.password ? 'border-red-400' : ''}`} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              {form.password && (
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {passwordRules.map(({ label, test }) => (
                    <div key={label} className={`flex items-center gap-1 text-xs ${test(form.password) ? 'text-primary-600' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${test(form.password) ? 'text-primary-600' : 'text-gray-300'}`} />
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <input type="password" className={`input-field ${errors.confirm ? 'border-red-400' : ''}`} placeholder="••••••••" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 accent-primary-700" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span className="text-sm text-gray-600">
                  I agree to the <Link href="/terms" className="text-primary-700 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary-700 hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base mt-2">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-700 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
