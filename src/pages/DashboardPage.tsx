
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Book, CheckCircle, Clock, FileText, LayoutDashboard, LogOut, Plus, Save, 
  User, ShieldCheck, Users, Briefcase, UserPlus, Search, ArrowLeft, Eye, 
  Zap, Activity, Ban, Handshake, Gift, MessageSquare, Shield, TrendingUp,
  Newspaper, ChevronRight, XCircle, Key, AtSign, Trash2, Check, Send, 
  Wifi, WifiOff, Calendar, BarChart3, ListFilter, Edit3, Download
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { useLanguage } from '../LanguageContext';

type Role = 'member' | 'partner' | 'worker' | 'admin';
type Tab = 'report' | 'monthly' | 'create_user' | 'site_control' | 'member_list' | 'partner_list' | 'worker_list' | 'admin_list' | 'supporter_list';

const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const loggedInRole: Role = location.state?.role || 'worker';
  const loggedInUsername: string = location.state?.username || 'current';
  const displayName: string = location.state?.name || t(`login.roles.${loggedInRole}`);
  
  const [activeTab, setActiveTab] = useState<Tab>(loggedInRole === 'admin' ? 'site_control' : 'report');
  const [submitted, setSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserForReview, setSelectedUserForReview] = useState<any | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const downloadRef = React.useRef<HTMLDivElement>(null);

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    name: '',
    role: 'member' as Role,
    institution: ''
  });

  // Persistence for Users
  const defaultUsers = [
    { id: '1', username: 'abdullah1', password: 'password123', name: 'Abdullah Al Mamun', role: 'member', status: 'active', institution: 'Shoronkhola Govt College' },
    { id: '2', username: 'sajid2', password: 'password123', name: 'Sajidul Islam', role: 'partner', status: 'active', institution: 'Rayenda Pilot High School' },
    { id: '3', username: 'tanvir3', password: 'password123', name: 'Tanvir Hossain', role: 'worker', status: 'active', institution: 'BICS Academy' },
    { id: '4', username: 'Nhuda', password: '1234567', name: 'Nhuda', role: 'admin', status: 'active', institution: 'Branch Office' },
    { id: '5', username: 'Admin_South', password: 'password123', name: 'Shoronkhola Responsible', role: 'admin', status: 'active', institution: 'Branch Office' },
  ];

  const [branchUsers, setBranchUsers] = useState(() => {
    const saved = localStorage.getItem('bics_users');
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [supporters, setSupporters] = useState(() => {
    const saved = localStorage.getItem('bics_supporters');
    return saved ? JSON.parse(saved) : [];
  });

  const deleteUser = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    const updated = branchUsers.filter((u: any) => u.id !== id);
    setBranchUsers(updated);
    localStorage.setItem('bics_users', JSON.stringify(updated));
  };

  const deleteSupporter = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this supporter?')) return;
    const updated = supporters.filter((s: any) => s.id !== id);
    setSupporters(updated);
    localStorage.setItem('bics_supporters', JSON.stringify(updated));
  };

  const downloadSupporterForm = async (supporter: any) => {
    if (downloadingId) return;
    setDownloadingId(supporter.id);
    
    // Give React time to render the hidden component
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (downloadRef.current) {
      try {
        // html-to-image can be finicky with off-screen elements
        // We ensure it's "visible" to the library
        const canvas = await htmlToImage.toCanvas(downloadRef.current, {
          backgroundColor: '#ffffff',
          cacheBust: true,
          pixelRatio: 2,
        });
        const dataUrl = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.download = `supporter_${supporter.name.replace(/\s+/g, '_')}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating image:', error);
        alert(language === 'bn' ? 'ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Failed to download. Please try again.');
      } finally {
        setDownloadingId(null);
      }
    } else {
      setDownloadingId(null);
    }
  };

  const updatePassword = (id: string, newPassword: string) => {
    if (!newPassword) return;
    const updated = branchUsers.map((u: any) => u.id === id ? { ...u, password: newPassword } : u);
    setBranchUsers(updated);
    localStorage.setItem('bics_users', JSON.stringify(updated));
  };

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const updated = [...branchUsers, { ...newUser, id, status: 'active' }];
    setBranchUsers(updated);
    localStorage.setItem('bics_users', JSON.stringify(updated));
    setNewUser({ username: '', password: '', name: '', role: 'member', institution: '' });
    setActiveTab('site_control');
    alert('User created successfully!');
  };

  // Persistence for Submissions
  const [allSubmissions, setAllSubmissions] = useState<any[]>(() => {
    const saved = localStorage.getItem('bics_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const initialFormState = {
    date: new Date().toISOString().split('T')[0],
    quran: '', hadith: '', textbook: '', literature: '',
    salat_jamaat: '', salat_kaza: '',
    comm_member: '', comm_partner: '', comm_worker: '', comm_supporter: '',
    comm_talented: '', comm_friend: '', comm_wellwisher: '', comm_muharrama: '',
    dist_lit: '', dist_gift: '', dist_sticker: '', dist_routine: '',
    org_dawah: '', org_other: '',
    newspaper: false, exercise: false, self_crit: false
  };

  const [formData, setFormData] = useState(initialFormState);

  // Requirement: Auto-reset or load data when DATE changes
  useEffect(() => {
    const targetUser = selectedUserForReview ? selectedUserForReview.username : loggedInUsername;
    const existing = allSubmissions.find(s => s.user === targetUser && s.date === formData.date);
    
    if (existing) {
      setFormData(existing);
    } else {
      setFormData(prev => ({ ...initialFormState, date: prev.date }));
    }
  }, [formData.date, selectedUserForReview, allSubmissions, loggedInUsername]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const targetUsername = selectedUserForReview ? selectedUserForReview.username : loggedInUsername;
    const newEntry = { 
      ...formData, 
      user: targetUsername, 
      timestamp: new Date().toISOString()
    };

    const filteredSubmissions = allSubmissions.filter(s => !(s.user === targetUsername && s.date === formData.date));
    const newSubmissions = [...filteredSubmissions, newEntry];
    
    setAllSubmissions(newSubmissions);
    localStorage.setItem('bics_submissions', JSON.stringify(newSubmissions));
    
    setTimeout(() => setSubmitted(false), 2000);
  };

  const calculateMonthlyStats = (username: string) => {
    const userSubs = allSubmissions.filter(s => s.user === username && s.date.startsWith(selectedMonth));
    const totals: any = {
      quran: 0, hadith: 0, textbook: 0, literature: 0,
      salat_jamaat: 0, salat_kaza: 0,
      comm_member: 0, comm_partner: 0, comm_worker: 0, comm_supporter: 0,
      comm_talented: 0, comm_friend: 0, comm_wellwisher: 0, comm_muharrama: 0,
      dist_lit: 0, dist_gift: 0, dist_sticker: 0, dist_routine: 0,
      org_dawah: 0, org_other: 0,
      sleep: 0, phone: 0,
      newspaper: 0, exercise: 0, self_crit: 0,
      daysReported: userSubs.length
    };
    userSubs.forEach(s => {
      Object.keys(totals).forEach(key => {
        if (key === 'daysReported') return;
        if (typeof s[key] === 'boolean') {
          if (s[key]) totals[key]++;
        } else {
          totals[key] += Number(s[key] || 0);
        }
      });
    });
    totals.org_total = (totals.org_dawah || 0) + (totals.org_other || 0);
    return totals;
  };

  const MonthlyReportView = ({ username, name }: { username: string, name: string }) => {
    const stats = calculateMonthlyStats(username);
    const daysInMonth = stats.daysReported || 1;

    const reportGroups = [
      {
        title: language === 'bn' ? 'অধ্যয়ন (Study)' : 'Study',
        icon: <Book className="text-emerald-600" size={20} />,
        fields: [
          { key: 'quran', label: t('dashboard.fields.quran') },
          { key: 'hadith', label: t('dashboard.fields.hadith') },
          { key: 'textbook', label: t('dashboard.fields.academic') },
          { key: 'literature', label: t('dashboard.fields.islamicLit') }
        ]
      },
      {
        title: language === 'bn' ? 'নামাজ (Salat)' : 'Salat',
        icon: <Activity className="text-blue-600" size={20} />,
        fields: [
          { key: 'salat_jamaat', label: 'Jamaat' },
          { key: 'salat_kaza', label: 'Kaza' }
        ]
      },
      {
        title: t('dashboard.reportSections.commType1'),
        icon: <Users className="text-indigo-600" size={20} />,
        fields: [
          { key: 'comm_member', label: t('dashboard.fields.member') },
          { key: 'comm_partner', label: t('dashboard.fields.partner') },
          { key: 'comm_worker', label: t('dashboard.fields.worker') },
          { key: 'comm_supporter', label: t('dashboard.fields.supporter') }
        ]
      },
      {
        title: t('dashboard.reportSections.commType2'),
        icon: <UserPlus className="text-purple-600" size={20} />,
        fields: [
          { key: 'comm_talented', label: t('dashboard.fields.talented') },
          { key: 'comm_friend', label: t('dashboard.fields.friend') },
          { key: 'comm_wellwisher', label: t('dashboard.fields.wellwisher') },
          { key: 'comm_muharrama', label: t('dashboard.fields.muharrama') }
        ]
      },
      {
        title: t('dashboard.reportSections.distribution'),
        icon: <Gift className="text-rose-600" size={20} />,
        fields: [
          { key: 'dist_lit', label: t('dashboard.fields.distLit') },
          { key: 'dist_gift', label: t('dashboard.fields.distGift') },
          { key: 'dist_sticker', label: t('dashboard.fields.distSticker') },
          { key: 'dist_routine', label: t('dashboard.fields.distRoutine') }
        ]
      },
      {
        title: t('dashboard.reportSections.orgWork'),
        icon: <Briefcase className="text-amber-600" size={20} />,
        fields: [
          { key: 'org_dawah', label: t('dashboard.fields.orgDawah') },
          { key: 'org_other', label: t('dashboard.fields.orgOther') },
          { key: 'org_total', label: language === 'bn' ? 'মোট সাংগঠনিক কাজ' : 'Total Org Work' },
          { key: 'sleep', label: t('dashboard.fields.sleep') },
          { key: 'phone', label: t('dashboard.fields.phone') }
        ]
      },
      {
        title: language === 'bn' ? 'ব্যক্তিগত (Personal)' : 'Personal',
        icon: <Zap className="text-yellow-600" size={20} />,
        fields: [
          { key: 'newspaper', label: t('dashboard.fields.newspaper') },
          { key: 'exercise', label: t('dashboard.fields.exercise') },
          { key: 'self_crit', label: t('dashboard.fields.selfCrit') }
        ]
      }
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{name} - {language === 'bn' ? 'মাসিক অগ্রগতি' : 'Monthly Progress'}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === 'bn' ? 'মোট রিপোর্ট' : 'Total Reports'}: {stats.daysReported}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{language === 'bn' ? 'মাস নির্বাচন করুন' : 'Select Month'}:</span>
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-emerald-700 outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {reportGroups.map((group, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2">
                {group.icon}
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs">{group.title}</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">{language === 'bn' ? 'বিষয়' : 'Field'}</th>
                      <th className="px-6 py-4 text-center">{language === 'bn' ? 'মাসিক মোট' : 'Monthly Total'}</th>
                      <th className="px-6 py-4 text-center">{language === 'bn' ? 'মাসিক গড়' : 'Monthly Average'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {group.fields.map((field) => (
                      <tr key={field.key} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-slate-700">{field.label}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="text-lg font-black text-emerald-700">{stats[field.key]}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="text-sm font-bold text-slate-500">
                            {(stats[field.key] / daysInMonth).toFixed(2)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'admin': return <Shield size={20} />;
      case 'member': return <ShieldCheck size={20} />;
      case 'partner': return <Users size={20} />;
      case 'worker': return <Briefcase size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-700/20">
              {getRoleIcon(loggedInRole)}
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold text-slate-900 leading-tight">
                {selectedUserForReview ? `${language === 'bn' ? 'তদারকি' : 'Managing'}: ${selectedUserForReview.name}` : `${t('dashboard.welcome')}, ${displayName}`}
              </h1>
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                {selectedUserForReview ? `${selectedUserForReview.role} Record` : `${loggedInRole} Portal`}
              </p>
            </div>
          </div>
          <button 
            onClick={() => selectedUserForReview ? setSelectedUserForReview(null) : navigate('/')} 
            className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-slate-600 font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            {selectedUserForReview ? <ArrowLeft size={16}/> : <LogOut size={16}/>}
            {selectedUserForReview ? (language === 'bn' ? 'তালিকায় ফিরুন' : 'Back to List') : t('nav.logout')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 mb-8 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
          {loggedInRole === 'admin' && !selectedUserForReview ? (
            <>
              <button onClick={() => setActiveTab('site_control')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'site_control' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>Branch Overview</button>
              <button onClick={() => setActiveTab('create_user')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'create_user' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}>Add User</button>
              <button onClick={() => setActiveTab('member_list')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'member_list' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>Members</button>
              <button onClick={() => setActiveTab('partner_list')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'partner_list' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>Partners</button>
              <button onClick={() => setActiveTab('worker_list')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'worker_list' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>Workers</button>
              <button onClick={() => setActiveTab('supporter_list')} className={`flex-1 min-w-[120px] py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'supporter_list' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>{language === 'bn' ? 'সমর্থক' : 'Supporters'}</button>
            </>
          ) : (
            <>
              <button onClick={() => setActiveTab('report')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'report' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>{language === 'bn' ? 'দৈনিক কার্যক্রম' : 'Daily Activity'}</button>
              <button onClick={() => setActiveTab('monthly')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'monthly' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>{language === 'bn' ? 'মাসিক রিপোর্ট' : 'Monthly Progress'}</button>
              <button onClick={() => setActiveTab('supporter_list')} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'supporter_list' ? 'bg-emerald-700 text-white shadow-lg' : 'text-slate-500'}`}>{language === 'bn' ? 'সমর্থক' : 'Supporters'}</button>
            </>
          )}
        </div>

        <div className="space-y-8">
          {activeTab === 'monthly' ? (
            <MonthlyReportView 
              username={selectedUserForReview ? selectedUserForReview.username : loggedInUsername} 
              name={selectedUserForReview ? selectedUserForReview.name : displayName} 
            />
          ) : activeTab === 'report' ? (
            <form onSubmit={handleSubmitReport} className="space-y-6 pb-10">
              {submitted && <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl font-bold text-center animate-bounce">{language === 'bn' ? 'প্রতিবেদন আপডেট করা হয়েছে!' : 'Report Updated!'}</div>}
              
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="font-bold text-slate-900">{language === 'bn' ? 'প্রতিবেদনের তারিখ' : 'Report Date'}</span>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-xs font-bold text-emerald-700 outline-none" 
                />
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Book className="text-emerald-600" size={20} /> Study (অধ্যয়ন)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'quran', label: t('dashboard.fields.quran') },
                    { key: 'hadith', label: t('dashboard.fields.hadith') },
                    { key: 'textbook', label: t('dashboard.fields.academic') },
                    { key: 'literature', label: t('dashboard.fields.islamicLit') }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-70" 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Activity className="text-blue-600" size={20} /> Salat (নামাজ)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Jamaat</label>
                    <input 
                      type="number" 
                      name="salat_jamaat" 
                      value={formData.salat_jamaat || ''} 
                      onChange={handleInputChange} 
                      disabled={loggedInRole === 'admin'}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold disabled:opacity-70" 
                      placeholder="0" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Kaza</label>
                    <input 
                      type="number" 
                      name="salat_kaza" 
                      value={formData.salat_kaza || ''} 
                      onChange={handleInputChange} 
                      disabled={loggedInRole === 'admin'}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold disabled:opacity-70" 
                      placeholder="0" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Users className="text-indigo-600" size={20} /> {t('dashboard.reportSections.commType1')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'comm_member', label: t('dashboard.fields.member') },
                    { key: 'comm_partner', label: t('dashboard.fields.partner') },
                    { key: 'comm_worker', label: t('dashboard.fields.worker') },
                    { key: 'comm_supporter', label: t('dashboard.fields.supporter') }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-70" 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><UserPlus className="text-purple-600" size={20} /> {t('dashboard.reportSections.commType2')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'comm_talented', label: t('dashboard.fields.talented') },
                    { key: 'comm_friend', label: t('dashboard.fields.friend') },
                    { key: 'comm_wellwisher', label: t('dashboard.fields.wellwisher') },
                    { key: 'comm_muharrama', label: t('dashboard.fields.muharrama') }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none disabled:opacity-70" 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Gift className="text-rose-600" size={20} /> {t('dashboard.reportSections.distribution')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'dist_lit', label: t('dashboard.fields.distLit') },
                    { key: 'dist_gift', label: t('dashboard.fields.distGift') },
                    { key: 'dist_sticker', label: t('dashboard.fields.distSticker') },
                    { key: 'dist_routine', label: t('dashboard.fields.distRoutine') }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none disabled:opacity-70" 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Briefcase className="text-amber-600" size={20} /> {t('dashboard.reportSections.orgWork')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: 'org_dawah', label: t('dashboard.fields.orgDawah') },
                    { key: 'org_other', label: t('dashboard.fields.orgOther') }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none disabled:opacity-70" 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{language === 'bn' ? 'মোট সাংগঠনিক কাজ' : 'Total Org Work'}</label>
                    <div className="w-full bg-slate-100 p-3 rounded-xl border border-slate-200 text-sm font-black text-emerald-700 flex items-center h-[46px]">
                      {(Number(formData.org_dawah) || 0) + (Number(formData.org_other) || 0)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock className="text-blue-600" size={20} /> {language === 'bn' ? 'ব্যক্তিগত সময়' : 'Personal Time'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'sleep', label: t('dashboard.fields.sleep'), icon: <Clock size={16}/>, color: 'blue' },
                    { key: 'phone', label: t('dashboard.fields.phone'), icon: <Activity size={16}/>, color: 'indigo' }
                  ].map(f => (
                    <div key={f.key} className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                      <input 
                        type="number" 
                        name={f.key} 
                        value={formData[f.key] || ''} 
                        onChange={handleInputChange} 
                        disabled={loggedInRole === 'admin'}
                        className={`w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-${f.color}-500 outline-none disabled:opacity-70`} 
                        placeholder="0" 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3"><Zap size={24} /> Final Checks</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { key: 'newspaper', label: t('dashboard.fields.newspaper') },
                    { key: 'exercise', label: t('dashboard.fields.exercise') },
                    { key: 'self_crit', label: t('dashboard.fields.selfCrit') }
                  ].map(check => (
                    <label key={check.key} className={`flex items-center gap-4 cursor-pointer group ${loggedInRole === 'admin' ? 'pointer-events-none opacity-70' : ''}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${formData[check.key] ? 'bg-white border-white text-emerald-900 shadow-lg' : 'border-white/20 text-transparent'}`}>
                        <Check size={20} />
                      </div>
                      <input type="checkbox" name={check.key} checked={formData[check.key]} onChange={handleInputChange} className="hidden" />
                      <span className="font-bold text-emerald-50">{check.label}</span>
                    </label>
                  ))}
                </div>
                {loggedInRole !== 'admin' && (
                  <button type="submit" className="w-full bg-white text-emerald-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all uppercase tracking-widest text-lg shadow-2xl">
                    <Save size={24} /> {language === 'bn' ? 'সেভ করুন' : 'Save Report'}
                  </button>
                )}
              </div>
            </form>
          ) : activeTab === 'site_control' ? (
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-emerald-50 opacity-10 -z-0"><Shield size={160} /></div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 relative z-10 uppercase tracking-tighter italic">Branch Control Center</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1 tracking-widest">Active Accounts</div>
                    <div className="text-3xl font-black text-emerald-900">{branchUsers.length}</div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm text-center">
                    <div className="text-[10px] font-bold text-blue-600 uppercase mb-1 tracking-widest">Total Reports</div>
                    <div className="text-3xl font-black text-blue-900">{allSubmissions.length}</div>
                  </div>
                  <button onClick={() => setActiveTab('create_user')} className="bg-emerald-700 p-6 rounded-2xl text-white font-bold flex flex-col items-center justify-center gap-2 hover:bg-emerald-800 transition-all shadow-xl group">
                    <UserPlus size={24} className="group-hover:scale-110 transition-transform"/>
                    <span className="text-xs uppercase tracking-widest">Add New Account</span>
                  </button>
                  <button onClick={() => setActiveTab('member_list')} className="bg-slate-900 p-6 rounded-2xl text-white font-bold flex flex-col items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl group">
                    <Users size={24} className="group-hover:scale-110 transition-transform"/>
                    <span className="text-xs uppercase tracking-widest">Manage Lists</span>
                  </button>
                </div>
            </div>
          ) : activeTab === 'create_user' ? (
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Create New Account</h2>
              <form onSubmit={addUser} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input required type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Abdullah Al Mamun" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</label>
                    <input required type="text" value={newUser.institution} onChange={(e) => setNewUser({...newUser, institution: e.target.value})} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Shoronkhola College" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                    <input required type="text" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500" placeholder="abdullah1" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                    <input required type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••••" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value as Role})} className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 font-bold outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="member">Member (সদস্য)</option>
                    <option value="partner">Partner (সাথী)</option>
                    <option value="worker">Worker (কর্মী)</option>
                    <option value="admin">Admin (দায়িত্বশীল)</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-emerald-800 transition-all uppercase tracking-widest">Create Account</button>
              </form>
            </div>
          ) : activeTab === 'supporter_list' ? (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{language === 'bn' ? 'সমর্থক তালিকা' : 'Supporter List'}</h2>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search supporters..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500" />
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Phone</th>
                          <th className="px-6 py-4">Institution</th>
                          <th className="px-6 py-4">Class</th>
                          <th className="px-6 py-4">Address</th>
                          {loggedInRole === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {supporters.filter((s: any) => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s: any) => (
                           <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4"><div className="font-bold text-slate-900">{s.name}</div></td>
                              <td className="px-6 py-4 text-xs text-slate-500 font-medium">{s.phone}</td>
                              <td className="px-6 py-4 text-xs text-slate-500 font-medium">{s.institution}</td>
                              <td className="px-6 py-4 text-xs text-slate-500 font-medium">{s.class}</td>
                              <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                                {s.villageMohalla || s.village || ''}, {s.upazila || s.union || ''}
                              </td>
                              {loggedInRole === 'admin' && (
                                <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button 
                                    onClick={() => downloadSupporterForm(s)} 
                                    disabled={downloadingId === s.id}
                                    className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm disabled:opacity-50"
                                    title="Download Form"
                                  >
                                     <Download size={16}/>
                                  </button>
                                  <button onClick={() => deleteSupporter(s.id)} className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all shadow-sm">
                                     <Trash2 size={16}/>
                                  </button>
                                </div>
                              </td>
                              )}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm flex items-center gap-2">
                    {getRoleIcon(activeTab.split('_')[0] as Role)} {activeTab.replace('_', ' ')}
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search name..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                         <tr><th className="px-6 py-4">Name & ID</th><th className="px-6 py-4">Institution</th><th className="px-6 py-4">Password</th><th className="px-6 py-4 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {branchUsers.filter(u => u.role === activeTab.split('_')[0] && u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((u: any) => (
                            <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                               <td className="px-6 py-4"><div className="font-bold text-slate-900">{u.name}</div><div className="text-[10px] text-slate-400 font-mono">{u.username}</div></td>
                               <td className="px-6 py-4 text-xs text-slate-500 font-medium">{u.institution}</td>
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-600">{u.password}</div>
                                    <button 
                                      onClick={() => {
                                        const newPass = window.prompt(`Enter new password for ${u.name}:`, u.password);
                                        if (newPass !== null && newPass !== u.password) {
                                          updatePassword(u.id, newPass);
                                        }
                                      }}
                                      className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                                      title="Change Password"
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                  </div>
                               </td>
                               <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                  <button onClick={() => { setSelectedUserForReview(u); setActiveTab('report'); }} className="p-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white rounded-xl transition-all inline-flex items-center gap-2 group shadow-sm">
                                     <Eye size={16}/> <span className="text-[10px] font-black uppercase">View Report</span>
                                  </button>
                                  <button onClick={() => deleteUser(u.id)} className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl transition-all inline-flex items-center shadow-sm">
                                     <Trash2 size={16}/>
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
            </div>
          )}
        </div>
      </div>
      {/* Hidden Supporter Form for Image Generation */}
      {downloadingId && (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-0">
          <div 
            ref={downloadRef}
            className="w-[800px] bg-white p-12 text-slate-900 font-serif"
            style={{ minHeight: '1000px', position: 'relative' }}
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-emerald-800 mb-2">বাংলাদেশ ইসলামী ছাত্রশিবির</h1>
              <div className="w-32 h-1 bg-emerald-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold underline decoration-emerald-200 underline-offset-8">ব্যক্তিগত তথ্য</h2>
            </div>

            {(() => {
              const s = supporters.find((sup: any) => sup.id === downloadingId);
              if (!s) return null;
              return (
                <div className="space-y-8 text-lg">
                  <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                    <span className="font-bold shrink-0">নাম :</span>
                    <span className="flex-grow">{s.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">পিতার নাম :</span>
                      <span className="flex-grow">{s.fatherName}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">মাতার নাম :</span>
                      <span className="flex-grow">{s.motherName}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">শ্রেণি :</span>
                      <span className="flex-grow">{s.class}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">বিভাগ :</span>
                      <span className="flex-grow">{s.section}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">ক্রমিক নম্বর :</span>
                      <span className="flex-grow">{s.roll}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                    <span className="font-bold shrink-0">শিক্ষা প্রতিষ্ঠান :</span>
                    <span className="flex-grow">{s.institution}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">ধর্ম :</span>
                      <span className="flex-grow">{s.religion}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">মোবাইল :</span>
                      <span className="flex-grow">{s.phone}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">ই-মেইল :</span>
                      <span className="flex-grow">{s.email}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">ফেসবুক :</span>
                      <span className="flex-grow">{s.facebook}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                    <span className="font-bold shrink-0">বর্তমান ঠিকানা :</span>
                    <span className="flex-grow">{s.currentAddress}</span>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-slate-600">স্থায়ী ঠিকানা :</h3>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                        <span className="font-bold shrink-0">গ্রাম/মহল্লা :</span>
                        <span className="flex-grow">{s.villageMohalla}</span>
                      </div>
                      <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                        <span className="font-bold shrink-0">ডাকঘর :</span>
                        <span className="flex-grow">{s.postOffice}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                        <span className="font-bold shrink-0">থানা :</span>
                        <span className="flex-grow">{s.upazila}</span>
                      </div>
                      <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                        <span className="font-bold shrink-0">জেলা :</span>
                        <span className="flex-grow">{s.district}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-20">
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">স্বাক্ষর :</span>
                      <span className="flex-grow italic font-serif">{s.signature}</span>
                    </div>
                    <div className="flex items-baseline gap-2 border-b border-dotted border-slate-300 pb-1">
                      <span className="font-bold shrink-0">তারিখ :</span>
                      <span className="flex-grow">{s.date}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
