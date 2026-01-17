
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { BookOpen, User, Shield, Globe, Sunrise, Zap, Users } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('introPage.title')} | BICS Shoronkhola South`;
  }, [t]);

  const sections = [
    { id: 'identity', title: t('introPage.sec1Title'), content: t('introPage.sec1Content'), icon: <User /> },
    { id: 'islam', title: t('introPage.sec2Title'), content: t('introPage.sec2Content'), icon: <Sunrise /> },
    { id: 'muslim', title: t('introPage.sec3Title'), content: t('introPage.sec3Content'), icon: <Shield /> },
    { id: 'reality', title: t('introPage.sec4Title'), content: t('introPage.sec4Content'), icon: <Globe /> },
    { id: 'judgment', title: t('introPage.sec5Title'), content: t('introPage.sec5Content'), icon: <BookOpen /> },
    { id: 'success', title: t('introPage.sec6Title'), content: t('introPage.sec6Content'), icon: <Sunrise /> },
    { id: 'organization', title: t('introPage.sec7Title'), content: t('introPage.sec7Content'), icon: <Users /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-emerald-900 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">{t('introPage.title')}</h1>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-emerald-100/80 text-lg md:text-xl font-medium">
            {t('introPage.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          {sections.map((sec, idx) => (
            <section key={sec.id} className="relative group scroll-mt-32">
              <div className="flex items-start gap-6 md:gap-10">
                <div className="hidden md:flex flex-col items-center">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm border border-emerald-100">
                    {sec.icon}
                  </div>
                  {idx !== sections.length - 1 && (
                    <div className="w-0.5 h-full bg-emerald-50 mt-4 rounded-full"></div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="md:hidden w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    {sec.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 border-b-4 border-emerald-500 w-fit pb-1">
                    {sec.title}
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed font-normal">
                    {sec.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 p-10 md:p-16 bg-slate-50 rounded-[3rem] border border-slate-200 text-center space-y-8">
           <h3 className="text-2xl font-bold text-slate-800">
             {t('bn') === 'বাংলা' ? 'ইহকাল ও পরকালের মুক্তিকামী মানুষের এই কাফেলায় আপনিও শরিক হোন।' : 'Join this caravan of people seeking liberation in this life and the hereafter.'}
           </h3>
           <div className="flex flex-wrap justify-center gap-4">
             <a href="#/become-supporter" className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20">
               {t('home.becomeSupporter')}
             </a>
             <a href="#/contact" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all">
               {t('nav.contact')}
             </a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
