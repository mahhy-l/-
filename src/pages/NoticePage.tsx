
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

const NoticePage: React.FC = () => {
  const { t, language } = useLanguage();

  const notices = [
    { 
      date: '2024-03-20', 
      title: language === 'bn' ? 'রমজান উপলক্ষে বিশেষ আলোচনা সভা' : 'Special Discussion Meeting for Ramadan',
      desc: language === 'bn' ? 'আগামীকাল বাদ আসর শাখা কার্যালয়ে পবিত্র রমজানের গুরুত্ব নিয়ে আলোচনা সভা অনুষ্ঠিত হবে।' : 'A discussion meeting on the importance of holy Ramadan will be held at the branch office tomorrow after Asr.'
    },
    { 
      date: '2024-03-15', 
      title: language === 'bn' ? 'মেধাবী ছাত্র সংবর্ধনা ২০২৪' : 'Meritorious Student Reception 2024',
      desc: language === 'bn' ? 'এসএসসি ও এইচএসসি পরীক্ষায় জিপিএ-৫ প্রাপ্ত ছাত্রদের সংবর্ধনা অনুষ্ঠানের তারিখ ঘোষণা করা হয়েছে।' : 'The date for the reception ceremony for students who achieved GPA-5 in SSC and HSC exams has been announced.'
    },
    { 
      date: '2024-03-10', 
      title: language === 'bn' ? 'ফ্রি ব্লাড গ্রুপিং ক্যাম্প' : 'Free Blood Grouping Camp',
      desc: language === 'bn' ? 'আগামী শুক্রবার স্থানীয় হাইস্কুল মাঠে ফ্রি ব্লাড গ্রুপিং ক্যাম্প অনুষ্ঠিত হবে।' : 'A free blood grouping camp will be held at the local high school field next Friday.'
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mb-6">
            <Bell size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('nav.notice')}</h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {notices.map((notice, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs mb-3 uppercase tracking-widest">
                <Calendar size={14} />
                {notice.date}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">{notice.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">{notice.desc}</p>
              <button className="text-emerald-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                {language === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read More'} <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
