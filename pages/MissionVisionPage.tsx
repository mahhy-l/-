
import React from 'react';
import { Target, Eye, Book, Users, ShieldCheck, Globe, PenTool, Flag, UserPlus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const MissionVisionPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('mission.missionTitle')} & ${t('mission.visionTitle')} | BICS Shoronkhola South`;
  }, [t]);

  const points = [
    { title: t('mission.p1Title'), desc: t('mission.p1Desc'), icon: <Flag size={24} />, color: "bg-emerald-50 text-emerald-600" },
    { title: t('mission.p2Title'), desc: t('mission.p2Desc'), icon: <Users size={24} />, color: "bg-blue-50 text-blue-600" },
    { title: t('mission.p3Title'), desc: t('mission.p3Desc'), icon: <ShieldCheck size={24} />, color: "bg-rose-50 text-rose-600" },
    { title: t('mission.p4Title'), desc: t('mission.p4Desc'), icon: <Book size={24} />, color: "bg-amber-50 text-amber-600" },
    { title: t('mission.p5Title'), desc: t('mission.p5Desc'), icon: <Globe size={24} />, color: "bg-indigo-50 text-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Page Header */}
      <div className="bg-emerald-900 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{t('nav.mission')}</h1>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full mb-8"></div>
          <p className="text-emerald-100/80 text-lg leading-relaxed max-w-2xl mx-auto">
             Dedicated to excellence in student development and community service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-16">
        {/* Goal & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-emerald-50 -z-0 opacity-10 group-hover:scale-110 transition-transform">
              <Target size={160} />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('mission.missionTitle')}</h2>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                "{t('mission.missionDesc')}"
              </p>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-blue-50 -z-0 opacity-10 group-hover:scale-110 transition-transform">
              <Eye size={160} />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                <Eye size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('mission.visionTitle')}</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {t('mission.visionDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* 5-Point Program Section */}
        <section className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-slate-100">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-4xl font-bold text-slate-900">{t('mission.programTitle')}</h2>
             <p className="text-slate-500 max-w-xl mx-auto font-medium">The scientific methodology upon which all activities of student community are conducted.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((p, i) => (
              <div key={i} className="flex flex-col p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-emerald-200 transition-all hover:bg-white hover:shadow-lg group">
                <div className={`w-14 h-14 ${p.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-auto pt-6 font-bold text-emerald-700 text-[10px] uppercase tracking-widest">Pillar 0{i+1}</div>
              </div>
            ))}
            
            {/* Encouragement Card */}
            <div className="bg-emerald-900 p-8 rounded-[2rem] text-white flex flex-col justify-center items-center text-center space-y-4">
               <h3 className="text-2xl font-bold">{t('home.becomeSupporter')}</h3>
               <p className="text-emerald-200/80 text-sm leading-relaxed">Become a part of this noble movement for building a better student society.</p>
               <a href="#/become-supporter" className="mt-4 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold transition-all shadow-xl shadow-emerald-950/20 flex items-center gap-2">
                 <UserPlus size={20} /> {t('home.becomeSupporter')}
               </a>
            </div>
          </div>
        </section>

        {/* Closing text */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
           <h3 className="text-2xl font-serif font-bold text-slate-800">A Caravan for Humanity</h3>
           <p className="text-slate-600 leading-relaxed">
              As Islam is for the welfare of all people, student community is moving forward with the program of presenting Islam beautifully to everyone - Muslims, Hindus, Buddhists and Christians alike. Join us and build yourself as a beautiful and most qualified person.
           </p>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPage;
