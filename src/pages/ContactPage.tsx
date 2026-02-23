
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Youtube } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('nav.contact')}</h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">{language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{language === 'bn' ? 'ঠিকানা' : 'Address'}</h3>
                    <p className="text-slate-600">Rayenda Bazar, Shoronkhola, Bagerhat, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{language === 'bn' ? 'ফোন' : 'Phone'}</h3>
                    <p className="text-slate-600">+880 1XXX XXXXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{language === 'bn' ? 'ইমেইল' : 'Email'}</h3>
                    <p className="text-slate-600">south.shoronkhola@bics.org</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6">{language === 'bn' ? 'আমাদের অনুসরণ করুন' : 'Follow Us'}</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-emerald-700 hover:text-white transition-all">
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-emerald-900 p-10 md:p-12 rounded-[3rem] text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-8">{language === 'bn' ? 'আমাদের মেসেজ দিন' : 'Send Us a Message'}</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-emerald-300">{language === 'bn' ? 'নাম' : 'Name'}</label>
                <input type="text" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:ring-2 focus:ring-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-emerald-300">{language === 'bn' ? 'ইমেইল' : 'Email'}</label>
                <input type="email" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:ring-2 focus:ring-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-emerald-300">{language === 'bn' ? 'মেসেজ' : 'Message'}</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:bg-white/20 focus:ring-2 focus:ring-white outline-none transition-all resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-white text-emerald-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-50 transition-all uppercase tracking-widest text-sm shadow-xl">
                <Send size={20} /> {language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
