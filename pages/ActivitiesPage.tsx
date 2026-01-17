
import React from 'react';
import { Book, Heart, Users, ShieldCheck, Globe, PenTool } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const ActivitiesPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('activitiesPage.title')} | BICS Shoronkhola South`;
  }, [t]);

  const programs = [
    {
      title: t('activitiesPage.p1Title'),
      desc: t('activitiesPage.p1Desc'),
      icon: <Book />
    },
    {
      title: t('activitiesPage.p2Title'),
      desc: t('activitiesPage.p2Desc'),
      icon: <Heart />
    },
    {
      title: t('activitiesPage.p3Title'),
      desc: t('activitiesPage.p3Desc'),
      icon: <ShieldCheck />
    },
    {
      title: t('activitiesPage.p4Title'),
      desc: t('activitiesPage.p4Desc'),
      icon: <Users />
    },
    {
      title: t('activitiesPage.p5Title'),
      desc: t('activitiesPage.p5Desc'),
      icon: <Globe />
    },
    {
      title: t('activitiesPage.p6Title'),
      desc: t('activitiesPage.p6Desc'),
      icon: <PenTool />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">{t('activitiesPage.title')}</h1>
        <p className="text-slate-600">{t('activitiesPage.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {p.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;
