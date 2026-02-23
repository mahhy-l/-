
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, GraduationCap, Heart, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-emerald-100/90 mb-10 leading-relaxed">
              {t('home.heroSub')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about" 
                className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-xl"
              >
                {t('home.learnMore')} <ChevronRight size={20} />
              </Link>
              <Link 
                to="/become-supporter" 
                className="bg-emerald-700/50 backdrop-blur-md border border-emerald-500/30 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700/70 transition-all"
              >
                {t('home.becomeSupporter')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('home.valuesTitle')}</h2>
            <div className="w-20 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('home.eduTitle')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('home.eduDesc')}</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('home.moralTitle')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('home.moralDesc')}</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t('home.socialTitle')}</h3>
              <p className="text-slate-600 leading-relaxed">{t('home.socialDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-800 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.empoweringTitle')}</h2>
                <p className="text-emerald-100/80 leading-relaxed mb-8">
                  {t('home.empoweringDesc')}
                </p>
                <Link to="/activities" className="inline-flex items-center gap-2 font-bold text-white hover:text-emerald-200 transition-colors">
                  {t('home.activitiesLink')} <ArrowRight size={20} />
                </Link>
              </div>
              <div className="flex-shrink-0">
                <Link to="/contact" className="bg-white text-emerald-900 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl hover:bg-emerald-50 transition-all">
                  {t('home.getInTouch')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
