
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Target, Eye, CheckCircle2 } from 'lucide-react';

const MissionVisionPage: React.FC = () => {
  const { t } = useLanguage();

  const points = [
    { title: t('mission.p1Title'), desc: t('mission.p1Desc') },
    { title: t('mission.p2Title'), desc: t('mission.p2Desc') },
    { title: t('mission.p3Title'), desc: t('mission.p3Desc') },
    { title: t('mission.p4Title'), desc: t('mission.p4Desc') },
    { title: t('mission.p5Title'), desc: t('mission.p5Desc') },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6">
              <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('mission.missionTitle')}</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{t('mission.missionDesc')}</p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6">
              <Eye size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('mission.visionTitle')}</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{t('mission.visionDesc')}</p>
          </div>
        </div>

        <div className="bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('mission.programTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {points.map((point, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/15 transition-all">
                <div className="text-emerald-400 font-black text-4xl mb-4 opacity-50">0{i + 1}</div>
                <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPage;
