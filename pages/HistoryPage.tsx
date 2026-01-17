
import React from 'react';
import { useLanguage } from '../LanguageContext';

const HistoryPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('history.title')} | BICS Shoronkhola South`;
  }, [t]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">{t('history.title')}</h1>
        
        <div className="space-y-12">
          <section className="relative pl-8 border-l-4 border-emerald-100">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white"></div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t('history.foundationTitle')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('history.foundationDesc')}
            </p>
          </section>

          <section className="relative pl-8 border-l-4 border-emerald-100">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white"></div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t('history.evolutionTitle')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('history.evolutionDesc')}
            </p>
          </section>

          <section className="relative pl-8 border-l-4 border-emerald-100">
            <div className="absolute -left-[14px] top-0 w-6 h-6 bg-emerald-600 rounded-full border-4 border-white"></div>
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">{t('history.heritageTitle')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('history.heritageDesc')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
