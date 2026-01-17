
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus, Phone, Mail, School, Facebook, ArrowLeft, CheckCircle, Users, MapPin, Home } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const SupporterFormPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    institution: '',
    union: '',
    village: '',
    phone: '',
    email: '',
    facebook: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 text-center space-y-6 max-w-lg">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{t('supporterForm.success')}</h1>
          <p className="text-slate-500">We appreciate your willingness to support our community activities. A representative will contact you if needed.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-emerald-700 text-white font-bold py-4 rounded-xl hover:bg-emerald-800 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <button 
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-emerald-700 font-semibold transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="text-center md:text-left">
            <div className="w-16 h-16 bg-emerald-700 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-700/30 mx-auto md:mx-0">
              <UserPlus size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">{t('supporterForm.title')}</h1>
            <p className="text-slate-500 mt-2">{t('supporterForm.sub')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <User size={16} className="text-emerald-600" /> {t('supporterForm.name')}
                </label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Abdullah Al Mamun"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Users size={16} className="text-emerald-600" /> {t('supporterForm.fatherName')}
                </label>
                <input 
                  required
                  type="text" 
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Users size={16} className="text-emerald-600" /> {t('supporterForm.motherName')}
                </label>
                <input 
                  required
                  type="text" 
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <School size={16} className="text-emerald-600" /> {t('supporterForm.institution')}
                </label>
                <input 
                  required
                  type="text" 
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="School/College/University"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              {/* Added Union Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <MapPin size={16} className="text-emerald-600" /> {t('supporterForm.union')}
                </label>
                <input 
                  required
                  type="text" 
                  name="union"
                  value={formData.union}
                  onChange={handleChange}
                  placeholder="Union Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              {/* Added Village Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Home size={16} className="text-emerald-600" /> {t('supporterForm.village')}
                </label>
                <input 
                  required
                  type="text" 
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  placeholder="Village Name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Phone size={16} className="text-emerald-600" /> {t('supporterForm.phone')}
                </label>
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Mail size={16} className="text-emerald-600" /> {t('supporterForm.email')}
                </label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                   <Facebook size={16} className="text-emerald-600" /> {t('supporterForm.facebook')}
                </label>
                <input 
                  required
                  type="text" 
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="e.g. facebook.com/profile"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all bg-slate-50"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 text-white font-bold py-5 rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-700/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>{t('supporterForm.submit')} <UserPlus size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupporterFormPage;
