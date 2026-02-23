
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Info, BookOpen, User, Globe, Shield, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    { id: 'sec1', icon: <User className="text-emerald-600" />, title: t('introPage.sec1Title'), content: t('introPage.sec1Content') },
    { id: 'sec2', icon: <Globe className="text-blue-600" />, title: t('introPage.sec2Title'), content: t('introPage.sec2Content') },
    { id: 'sec3', icon: <Shield className="text-indigo-600" />, title: t('introPage.sec3Title'), content: t('introPage.sec3Content') },
    { id: 'sec4', icon: <Star className="text-amber-600" />, title: t('introPage.sec4Title'), content: t('introPage.sec4Content') },
    { id: 'sec5', icon: <BookOpen className="text-rose-600" />, title: t('introPage.sec5Title'), content: t('introPage.sec5Content') },
    { id: 'sec6', icon: <Info className="text-emerald-600" />, title: t('introPage.sec6Title'), content: t('introPage.sec6Content') },
    { id: 'sec7', icon: <Globe className="text-emerald-700" />, title: t('introPage.sec7Title'), content: t('introPage.sec7Content') },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('introPage.title')}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('introPage.subtitle')}</p>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {sections.map((sec) => (
            <div key={sec.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
                  {sec.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{sec.title}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
