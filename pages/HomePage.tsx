
import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Shield, ArrowRight, UserPlus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  
  React.useEffect(() => {
    document.title = "BICS Shoronkhola South | Official Website";
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero background" 
            className="w-full h-full object-cover brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg text-emerald-50/90 leading-relaxed max-w-xl">
              {t('home.heroSub')}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/become-supporter" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 rounded-2xl font-bold transition-all flex items-center gap-3 shadow-2xl shadow-emerald-900/40 text-lg">
                <UserPlus size={24} /> {t('home.becomeSupporter')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('home.valuesTitle')}</h2>
          <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('home.eduTitle'),
              description: t('home.eduDesc'),
              icon: <GraduationCap className="text-emerald-600" size={32} />,
              color: "bg-emerald-50"
            },
            {
              title: t('home.moralTitle'),
              description: t('home.moralDesc'),
              icon: <Shield className="text-emerald-600" size={32} />,
              color: "bg-blue-50"
            },
            {
              title: t('home.socialTitle'),
              description: t('home.socialDesc'),
              icon: <Heart className="text-emerald-600" size={32} />,
              color: "bg-rose-50"
            }
          ].map((item, idx) => (
            <div key={idx} className={`${item.color} p-10 rounded-2xl transition-transform hover:-translate-y-2`}>
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview of Activities Preview */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" alt="Students activity" className="rounded-2xl shadow-2xl" />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">{t('nav.activities')}</span>
            <h2 className="text-4xl font-bold text-slate-900">{t('home.empoweringTitle')}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t('home.empoweringDesc')}
            </p>
            <ul className="space-y-4">
              {['Academic Support Programs', 'Character Building Seminars', 'Public Welfare Projects', 'Social Welfare Services'].map((list, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  </div>
                  {list}
                </li>
              ))}
            </ul>
            <Link to="/activities" className="inline-block text-emerald-700 font-bold hover:underline">
              {t('home.activitiesLink')} &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
