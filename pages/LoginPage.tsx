
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Shield } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type LoginRole = 'member' | 'partner' | 'worker' | 'admin';

const LoginPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<LoginRole>('admin');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Pre-defined official accounts (Now hidden from UI)
  const officialAccounts = [
    { user: 'Nhuda', pass: '1234567', role: 'admin', name: 'Nhuda' },
    { user: 'Admin_South', pass: 'admin786', role: 'admin', name: 'Shoronkhola Responsible' },
    { user: 'shathikhan', pass: 'password123', role: 'partner', name: 'Sathi Khan' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();

      const account = officialAccounts.find(acc => acc.user === cleanUsername && acc.pass === cleanPassword);

      if (account) {
        navigate('/dashboard', { 
          state: { 
            role: account.role, 
            name: account.name,
            isOfficial: true 
          } 
        });
      } else if (cleanUsername !== '' && cleanPassword === '1234567' && activeRole !== 'admin') {
        // Generic demo login
        navigate('/dashboard', { state: { role: activeRole, name: username } });
      } else {
        setError(language === 'bn' 
          ? 'ভুল আইডি অথবা পাসওয়ার্ড। আবার চেষ্টা করুন।' 
          : 'Invalid ID or password. Please try again.');
      }
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t('login.title')}</h1>
          <p className="text-slate-500 text-sm mt-2">{t('login.sub')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                required 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder=""
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all outline-none bg-slate-50" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input 
                required 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder=""
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 transition-all outline-none bg-slate-50" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full mt-4 bg-emerald-700 text-white font-black py-4.5 rounded-xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : t('login.btn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
