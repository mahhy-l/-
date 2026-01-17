
import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = "Contact Us | BICS Shoronkhola South";
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-slate-900">{t('contact.title')}</h1>
            <p className="text-slate-600 text-lg">
              {t('contact.sub')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{t('contact.address')}</h4>
                <p className="text-slate-600">{t('contact.addressVal')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{t('contact.email')}</h4>
                <p className="text-slate-600">contact@shoronkhola-south-bics.org</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{t('contact.phone')}</h4>
                <p className="text-slate-600">+880 (Local Branch Helplines)</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 mt-8">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
               {t('contact.futurePlan')}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('contact.futureDesc')}
            </p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">{t('contact.formName')}</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">{t('contact.formEmail')}</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t('contact.formSubject')}</label>
              <input type="text" placeholder="General Inquiry" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t('contact.formMessage')}</label>
              <textarea rows={5} placeholder="Write your message here..." className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"></textarea>
            </div>
            <button className="w-full bg-emerald-700 text-white font-bold py-4 rounded-lg hover:bg-emerald-800 transition-all flex items-center justify-center gap-2">
              {t('contact.formSend')} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
