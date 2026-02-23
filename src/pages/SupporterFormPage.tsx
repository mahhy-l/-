
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { UserPlus, CheckCircle2, Send } from 'lucide-react';

const SupporterFormPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    class: '',
    section: '',
    roll: '',
    institution: '',
    religion: '',
    phone: '',
    email: '',
    facebook: '',
    currentAddress: '',
    villageMohalla: '',
    postOffice: '',
    upazila: '',
    district: '',
    signature: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const savedSupporters = JSON.parse(localStorage.getItem('bics_supporters') || '[]');
    const newSupporter = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('bics_supporters', JSON.stringify([...savedSupporters, newSupporter]));
    
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-in zoom-in duration-500">
        <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{language === 'bn' ? 'ধন্যবাদ!' : 'Thank You!'}</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">{t('supporterForm.success')}</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-800 transition-all"
          >
            {language === 'bn' ? 'আবার আবেদন করুন' : 'Apply Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mb-6">
            <UserPlus size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('supporterForm.title')}</h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-emerald-800 border-b-2 border-emerald-100 pb-2 inline-block">
              {t('supporterForm.personalInfo')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.name')}</label>
              <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
            </div>

            {/* Father & Mother Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.fatherName')}</label>
                <input name="fatherName" value={formData.fatherName} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.motherName')}</label>
                <input name="motherName" value={formData.motherName} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Class, Section, Roll */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.class')}</label>
                <input name="class" value={formData.class} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.section')}</label>
                <input name="section" value={formData.section} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.roll')}</label>
                <input name="roll" value={formData.roll} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Institution */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.institution')}</label>
              <input required name="institution" value={formData.institution} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
            </div>

            {/* Religion & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.religion')}</label>
                <input name="religion" value={formData.religion} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.phone')}</label>
                <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Email & Facebook */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.email')}</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.facebook')}</label>
                <input name="facebook" value={formData.facebook} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
            </div>

            {/* Current Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.currentAddress')}</label>
              <textarea name="currentAddress" value={formData.currentAddress} onChange={handleInputChange} rows={2} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none" />
            </div>

            {/* Permanent Address Header */}
            <div className="pt-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-4 border-emerald-500 pl-3">
                {t('supporterForm.permanentAddress')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.villageMohalla')}</label>
                  <input name="villageMohalla" value={formData.villageMohalla} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.postOffice')}</label>
                  <input name="postOffice" value={formData.postOffice} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.upazila')}</label>
                  <input name="upazila" value={formData.upazila} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.district')}</label>
                  <input name="district" value={formData.district} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
                </div>
              </div>
            </div>

            {/* Signature & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.signature')}</label>
                <input name="signature" value={formData.signature} onChange={handleInputChange} type="text" placeholder={language === 'bn' ? 'আপনার নাম লিখুন' : 'Type your name'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium italic" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('supporterForm.date')}</label>
                <input name="date" value={formData.date} onChange={handleInputChange} type="date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium" />
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all uppercase tracking-widest text-sm shadow-xl shadow-emerald-700/20 mt-8">
              <Send size={20} /> {t('supporterForm.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupporterFormPage;
