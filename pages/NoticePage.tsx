
import React from 'react';
import { Calendar, Tag } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const NoticePage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('notices.title')} | BICS Shoronkhola South`;
  }, [t]);

  const noticesList = t('notices.list') || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('notices.title')}</h1>
        <p className="text-slate-600">{t('notices.subtitle')}</p>
      </div>

      <div className="space-y-6">
        {noticesList.map((n: any, i: number) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-emerald-200 transition-colors">
            <div className="md:w-48 shrink-0">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                <Calendar size={16} /> {n.date}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium uppercase tracking-wider">
                <Tag size={12} /> {n.cat}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors">{n.title}</h3>
              <p className="text-slate-600 leading-relaxed">{n.desc}</p>
              <button className="text-emerald-600 font-bold text-sm uppercase tracking-widest hover:underline">{t('notices.readMore')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticePage;
