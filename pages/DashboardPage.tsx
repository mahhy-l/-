
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Book, CheckCircle, Clock, FileText, LayoutDashboard, LogOut, Plus, Save, 
  User, ShieldCheck, Users, Briefcase, UserPlus, Search, ArrowLeft, Eye, 
  Zap, Activity, Ban, Handshake, Gift, MessageSquare, Shield, TrendingUp,
  Newspaper, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type Role = 'member' | 'partner' | 'worker' | 'admin';
type Tab = 'report' | 'supporters' | 'monthly' | 'yearly' | 'create_user' | 'site_control' | 'member_list' | 'partner_list' | 'worker_list' | 'admin_list';

const DashboardPage = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  const loggedInRole: Role = location.state?.role || 'worker';
  const displayName: string = location.state?.name || t(`login.roles.${loggedInRole}`);
  const [activeTab, setActiveTab] = useState<Tab>(loggedInRole === 'admin' ? 'site_control' : 'report');
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserForReport, setSelectedUserForReport] = useState<any | null>(null);
  
  // Simulated Local Database with multiple roles
  const [branchUsers, setBranchUsers] = useState([
    { id: '1', name: 'Abdullah Al Mamun', role: 'member', status: 'active', institution: 'Shoronkhola Govt College' },
    { id: '2', name: 'Sajidul Islam', role: 'partner', status: 'active', institution: 'Rayenda Pilot High School' },
    { id: '3', name: 'Tanvir Hossain', role: 'worker', status: 'active', institution: 'BICS Academy' },
    { id: '4', name: 'Nhuda', role: 'admin', status: 'active', institution: 'Branch Office' },
    { id: '5', name: 'Shoronkhola Responsible', role: 'admin', status: 'active', institution: 'Branch Office' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', role: 'worker' as Role, institution: '' });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { ...newUser, id: (branchUsers.length + 1).toString(), status: 'active' };
    setBranchUsers([...branchUsers, user]);
    setNewUser({ name: '', role: 'worker', institution: '' });
    setActiveTab(`${newUser.role}_list` as Tab);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const toggleUserStatus = (id: string) => {
    setBranchUsers(branchUsers.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
  };

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    quran: '', hadith: '', textbook: '', literature: '',
    salat_jamaat: '', salat_kaza: '',
    comm_member: '', comm_partner: '', comm_worker: '', comm_supporter: '',
    comm_talented: '', comm_friend: '', comm_wellwisher: '', comm_muharrama: '',
    dist_lit: '', dist_gift: '', dist_sticker: '', dist_routine: '',
    org_dawah: '', org_other: '',
    newspaper: false, exercise: false, self_crit: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'admin': return <Shield size={20} />;
      case 'member': return <ShieldCheck size={20} />;
      case 'partner': return <Users size={20} />;
      case 'worker': return <Briefcase size={20} />;
    }
  };

  const UserListTable = ({ role }: { role: Role }) => {
    const filtered = branchUsers.filter(u => u.role === role && u.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${role === 'member' ? 'bg-emerald-100 text-emerald-700' : role === 'partner' ? 'bg-blue-100 text-blue-700' : role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
              {getRoleIcon(role)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{t(`login.roles.${role}`)} Directory</h2>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filtered.length} Total</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 rounded-xl border border-slate-200 w-full md:w-64 focus:ring-2 focus:ring-emerald-500 transition-all outline-none bg-slate-50" 
            />
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="py-4 px-4">Name & ID</th>
                <th className="py-4 px-4">Institution</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[10px] text-slate-400">ID: SH-{u.id.padStart(4, '0')}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-500">{u.institution}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${u.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right flex justify-end gap-2">
                    {role !== 'admin' && (
                      <button 
                        onClick={() => { setSelectedUserForReport(u); setActiveTab('report'); }}
                        className="p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 px-3 text-xs font-bold"
                      >
                        <Eye size={14} /> Reports
                      </button>
                    )}
                    <button 
                      onClick={() => toggleUserStatus(u.id)}
                      className={`p-2 rounded-lg transition-all ${u.status === 'active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                    >
                      {u.status === 'active' ? <Ban size={16} /> : <CheckCircle size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const DailyReportForm = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {submitted && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2 font-bold animate-bounce">
          <CheckCircle size={20} /> {t('dashboard.success')}
        </div>
      )}
      
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t('dashboard.dailyReport')}</h2>
          {selectedUserForReport && <p className="text-sm text-emerald-600 font-bold mt-1">Reviewing user: {selectedUserForReport.name}</p>}
        </div>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700 bg-slate-50 outline-none" />
      </div>

      <form onSubmit={handleSubmitReport} className="space-y-8">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
             <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><Book size={20}/></div>
             <h3 className="text-xl font-bold text-slate-900">Study & Knowledge (অধ্যয়ন ও জ্ঞান)</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.quran')}</label>
                <input type="number" name="quran" value={formData.quran} onChange={handleInputChange} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.hadith')}</label>
                <input type="number" name="hadith" value={formData.hadith} onChange={handleInputChange} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.academic')}</label>
                <input type="number" name="textbook" value={formData.textbook} onChange={handleInputChange} placeholder="Hours" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.islamicLit')}</label>
                <input type="number" name="literature" value={formData.literature} onChange={handleInputChange} placeholder="Pages" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
           </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><Zap size={20}/></div>
             <h3 className="text-xl font-bold text-slate-900">Salat (নামাজ)</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.jamaat')}</label>
                <input type="number" name="salat_jamaat" value={formData.salat_jamaat} onChange={handleInputChange} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('dashboard.fields.kaza')}</label>
                <input type="number" name="salat_kaza" value={formData.salat_kaza} onChange={handleInputChange} placeholder="0" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none" />
              </div>
           </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-50">
             <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><MessageSquare size={20}/></div>
             <h3 className="text-xl font-bold text-slate-900">Communication (যোগাযোগ)</h3>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'comm_member', label: t('dashboard.fields.member') },
                { name: 'comm_partner', label: t('dashboard.fields.partner') },
                { name: 'comm_worker', label: t('dashboard.fields.worker') },
                { name: 'comm_supporter', label: t('dashboard.fields.supporter') },
                { name: 'comm_talented', label: t('dashboard.fields.talented') },
                { name: 'comm_friend', label: t('dashboard.fields.friend') },
                { name: 'comm_wellwisher', label: t('dashboard.fields.wellwisher') },
                { name: 'comm_muharrama', label: t('dashboard.fields.muharrama') },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{field.label}</label>
                  <input type="number" name={field.name} placeholder="0" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-center" />
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center"><Gift size={20}/></div>
                <h3 className="text-lg font-bold text-slate-900">Distribution (বিতরণ)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.distLit')}</label>
                    <input type="number" name="dist_lit" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="0" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.distGift')}</label>
                    <input type="number" name="dist_gift" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="0" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.distSticker')}</label>
                    <input type="number" name="dist_sticker" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="0" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.distRoutine')}</label>
                    <input type="number" name="dist_routine" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl" placeholder="0" />
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center"><Handshake size={20}/></div>
                <h3 className="text-lg font-bold text-slate-900">Org Work (সাংগঠনিক কাজ)</h3>
              </div>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.orgDawah')}</label>
                    <input type="number" name="org_dawah" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Hours" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">{t('dashboard.fields.orgOther')}</label>
                    <input type="number" name="org_other" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Hours" />
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-emerald-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl text-white">
           <div className="flex items-center gap-3 mb-10">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Activity size={24}/></div>
             <h3 className="text-xl font-bold">Personal Routine (ব্যক্তিগত আমল)</h3>
           </div>
           <div className="flex flex-wrap gap-10">
              <label className="flex items-center gap-4 cursor-pointer group">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${formData.newspaper ? 'bg-white border-white text-emerald-900' : 'border-white/30 text-transparent'}`}><CheckCircle size={20} fill="currentColor"/></div>
                 <input type="checkbox" name="newspaper" checked={formData.newspaper} onChange={handleInputChange} className="hidden" />
                 <span className="font-bold text-emerald-50">{t('dashboard.fields.newspaper')}</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${formData.exercise ? 'bg-white border-white text-emerald-900' : 'border-white/30 text-transparent'}`}><CheckCircle size={20} fill="currentColor"/></div>
                 <input type="checkbox" name="exercise" checked={formData.exercise} onChange={handleInputChange} className="hidden" />
                 <span className="font-bold text-emerald-50">{t('dashboard.fields.exercise')}</span>
              </label>
              <label className="flex items-center gap-4 cursor-pointer group">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all ${formData.self_crit ? 'bg-white border-white text-emerald-900' : 'border-white/30 text-transparent'}`}><CheckCircle size={20} fill="currentColor"/></div>
                 <input type="checkbox" name="self_crit" checked={formData.self_crit} onChange={handleInputChange} className="hidden" />
                 <span className="font-bold text-emerald-50">{t('dashboard.fields.selfCrit')}</span>
              </label>
           </div>
           
           <button type="submit" className="w-full mt-12 bg-white text-emerald-900 font-black py-5 rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 shadow-2xl uppercase tracking-widest text-lg">
             <Save size={24} /> {loggedInRole === 'admin' ? 'Verify Report' : t('dashboard.submitReport')}
           </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-700/20">{getRoleIcon(loggedInRole)}</div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{t('dashboard.welcome')}, {displayName}</h1>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                {loggedInRole === 'admin' ? 'Branch Admin (দায়িত্বশীল)' : `${loggedInRole} Account`}
              </span>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 px-5 py-2 border border-slate-200 rounded-xl text-slate-500 font-bold text-xs hover:bg-slate-50 transition-all"><LogOut size={16} /> {language === 'bn' ? 'লগআউট' : 'Sign Out'}</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loggedInRole === 'admin' && !selectedUserForReport && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
             <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab('admin_list')}>
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center"><Shield size={20} /></div>
                <div><div className="text-[10px] font-bold text-slate-400 uppercase">Admins</div><div className="text-xl font-black text-slate-900">{branchUsers.filter(u => u.role === 'admin').length}</div></div>
             </div>
             <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab('member_list')}>
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center"><ShieldCheck size={20} /></div>
                <div><div className="text-[10px] font-bold text-slate-400 uppercase">Members</div><div className="text-xl font-black text-slate-900">{branchUsers.filter(u => u.role === 'member').length}</div></div>
             </div>
             <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab('partner_list')}>
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center"><Users size={20} /></div>
                <div><div className="text-[10px] font-bold text-slate-400 uppercase">Partners</div><div className="text-xl font-black text-slate-900">{branchUsers.filter(u => u.role === 'partner').length}</div></div>
             </div>
             <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:bg-slate-50" onClick={() => setActiveTab('worker_list')}>
                <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center"><Briefcase size={20} /></div>
                <div><div className="text-[10px] font-bold text-slate-400 uppercase">Workers</div><div className="text-xl font-black text-slate-900">{branchUsers.filter(u => u.role === 'worker').length}</div></div>
             </div>
             <div className="bg-emerald-700 p-5 rounded-[1.5rem] shadow-xl text-white flex items-center gap-4 cursor-pointer hover:bg-emerald-800 transition-all" onClick={() => setActiveTab('create_user')}>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><UserPlus size={20} /></div>
                <div><div className="text-[10px] font-bold text-emerald-200 uppercase">New</div><div className="text-md font-bold">Add User</div></div>
             </div>
          </div>
        )}

        <div className="flex overflow-x-auto gap-2 border-b border-slate-200 mb-10 scrollbar-hide">
           {loggedInRole === 'admin' && !selectedUserForReport ? (
             <>
                <button onClick={() => setActiveTab('site_control')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'site_control' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>Admin Center</button>
                <button onClick={() => setActiveTab('admin_list')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'admin_list' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>Admin List</button>
                <button onClick={() => setActiveTab('member_list')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'member_list' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>Member List</button>
                <button onClick={() => setActiveTab('partner_list')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'partner_list' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>Partner List</button>
                <button onClick={() => setActiveTab('worker_list')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'worker_list' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>Worker List</button>
             </>
           ) : (
             <>
                <button onClick={() => setActiveTab('report')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'report' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>{t('dashboard.dailyReport')}</button>
                <button onClick={() => setActiveTab('monthly')} className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'monthly' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>{t('dashboard.monthlyProgress')}</button>
             </>
           )}
        </div>

        <div className="grid grid-cols-1 gap-8">
           {activeTab === 'report' ? <DailyReportForm /> :
            activeTab === 'monthly' ? (
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 overflow-x-auto scrollbar-hide text-center">
                 <h2 className="text-2xl font-bold text-slate-900 mb-8">{t('dashboard.monthlyProgress')}</h2>
                 <p className="text-slate-400">Monthly breakdown and summary reports will appear here.</p>
              </div>
            ) :
            activeTab === 'site_control' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-emerald-950 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-4xl font-black mb-4">Branch Control</h2>
                      <p className="text-emerald-100/70 max-w-md">Complete oversight for multiple admins. Any Responsible can manage users and monitor student progress.</p>
                      <div className="flex flex-wrap gap-4 mt-8">
                        <button onClick={() => setActiveTab('create_user')} className="bg-emerald-600 px-6 py-4 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-xl"><UserPlus size={20}/> Add New Student</button>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 p-10 opacity-10"><Shield size={220} /></div>
                  </div>
                </div>
                
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                  <h3 className="text-xl font-bold text-slate-900">Branch Stats</h3>
                  <div className="space-y-6">
                     <div className="flex items-center justify-between"><span className="text-slate-500 text-xs font-bold uppercase">Admins</span><span className="font-black text-amber-600">{branchUsers.filter(u => u.role === 'admin').length}</span></div>
                     <div className="flex items-center justify-between"><span className="text-slate-500 text-xs font-bold uppercase">Students</span><span className="font-black text-slate-900">{branchUsers.length - branchUsers.filter(u => u.role === 'admin').length}</span></div>
                  </div>
                </div>
              </div>
            ) :
            activeTab === 'admin_list' ? <UserListTable role="admin" /> :
            activeTab === 'member_list' ? <UserListTable role="member" /> :
            activeTab === 'partner_list' ? <UserListTable role="partner" /> :
            activeTab === 'worker_list' ? <UserListTable role="worker" /> :
            activeTab === 'create_user' ? (
              <div className="max-w-3xl mx-auto w-full">
                 <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">New User Registration</h2>
                    <form onSubmit={handleAddUser} className="space-y-6">
                       <input required type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none" />
                       <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value as Role})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 font-bold">
                          <option value="worker">Worker</option>
                          <option value="partner">Partner</option>
                          <option value="member">Member</option>
                          <option value="admin">Responsible (Admin)</option>
                       </select>
                       <input required type="text" value={newUser.institution} onChange={(e) => setNewUser({...newUser, institution: e.target.value})} placeholder="Institution" className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none" />
                       <button type="submit" className="w-full bg-emerald-700 text-white font-black py-5 rounded-2xl hover:bg-emerald-800 transition-all uppercase tracking-widest shadow-xl">Create User Profile</button>
                    </form>
                 </div>
              </div>
            ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
