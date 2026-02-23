
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield, Key, User, Info, AlertCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const LoginPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    const defaultAccounts = [
      { id: '1', username: 'abdullah1', password: 'password123', name: 'Abdullah Al Mamun', role: 'member', status: 'active', institution: 'Shoronkhola Govt College' },
      { id: '2', username: 'sajid2', password: 'password123', name: 'Sajidul Islam', role: 'partner', status: 'active', institution: 'Rayenda Pilot High School' },
      { id: '3', username: 'tanvir3', password: 'password123', name: 'Tanvir Hossain', role: 'worker', status: 'active', institution: 'BICS Academy' },
      { id: '4', username: 'Nhuda', password: '1234567', name: 'Nhuda', role: 'admin', status: 'active', institution: 'Branch Office' },
      { id: '5', username: 'Admin_South', password: 'password123', name: 'Shoronkhola Responsible', role: 'admin', status: 'active', institution: 'Branch Office' },
    ];

    const savedUsers = JSON.parse(localStorage.getItem('bics_users') || '[]');
    const allAccounts = [...defaultAccounts];
    
    // Add saved users if they don't already exist in defaultAccounts (to avoid duplicates)
    savedUsers.forEach((u: any) => {
      if (!allAccounts.find(acc => acc.username === u.username)) {
        allAccounts.push(u);
      }
    });

    const account = allAccounts.find((acc: any) => acc.username === cleanUsername && acc.password === cleanPassword);

    if (account) {
      navigate('/dashboard', { state: account });
    } else {
      setError(language === 'bn' 
        ? 'ভুল আইডি বা পাসওয়ার্ড। আবার চেষ্টা করুন।' 
        : 'Invalid ID or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-emerald-700 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-700/20 mb-6">
            <Shield size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('login.title')}</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">{t('login.sub')}</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in shake duration-300">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('login.id')}</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{t('login.pass')}</label>
              <div className="relative">
                <Key className="absolute left-4 top-4 text-slate-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-3 py-5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-700/20 transition-all"
            >
              <LogIn size={20} /> {t('login.btn')}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">{t('login.instruction')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {t('login.instructionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
