
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Calendar, Users, Heart, GraduationCap, BookOpen, Globe } from 'lucide-react';

const ActivitiesPage: React.FC = () => {
  const { t, language } = useLanguage();

  const activities = [
    { 
      icon: <GraduationCap className="text-emerald-600" />, 
      title: language === 'bn' ? 'শিক্ষা সহায়তা' : 'Educational Support',
      desc: language === 'bn' ? 'মেধাবী ও অসচ্ছল ছাত্রদের জন্য ফ্রি কোচিং এবং শিক্ষা উপকরণ বিতরণ।' : 'Free coaching and distribution of educational materials for talented and underprivileged students.'
    },
    { 
      icon: <Heart className="text-rose-600" />, 
      title: language === 'bn' ? 'সমাজসেবা' : 'Social Service',
      desc: language === 'bn' ? 'রক্তদান কর্মসূচি, শীতবস্ত্র বিতরণ এবং দুর্যোগকালীন ত্রাণ সহায়তা।' : 'Blood donation drives, winter clothing distribution, and disaster relief assistance.'
    },
    { 
      icon: <BookOpen className="text-blue-600" />, 
      title: language === 'bn' ? 'পাঠাগার কার্যক্রম' : 'Library Activities',
      desc: language === 'bn' ? 'ছাত্রদের জ্ঞান বিকাশে ভ্রাম্যমাণ ও স্থায়ী পাঠাগার পরিচালনা।' : 'Operating mobile and permanent libraries to develop students\' knowledge.'
    },
    { 
      icon: <Users className="text-indigo-600" />, 
      title: language === 'bn' ? 'ক্যারিয়ার গাইডেন্স' : 'Career Guidance',
      desc: language === 'bn' ? 'ছাত্রদের ভবিষ্যৎ ক্যারিয়ার গঠনে সেমিনার ও কর্মশালা আয়োজন।' : 'Organizing seminars and workshops to shape students\' future careers.'
    },
    { 
      icon: <Globe className="text-amber-600" />, 
      title: language === 'bn' ? 'পরিবেশ রক্ষা' : 'Environment Protection',
      desc: language === 'bn' ? 'বৃক্ষরোপণ কর্মসূচি এবং পরিচ্ছন্নতা অভিযান পরিচালনা।' : 'Tree plantation programs and cleanliness drives.'
    },
    { 
      icon: <Calendar className="text-emerald-700" />, 
      title: language === 'bn' ? 'সাংস্কৃতিক অনুষ্ঠান' : 'Cultural Events',
      desc: language === 'bn' ? 'সুস্থ সংস্কৃতির বিকাশে হামদ-নাত ও কুইজ প্রতিযোগিতার আয়োজন।' : 'Organizing Hamd-Naat and quiz competitions to develop healthy culture.'
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('nav.activities')}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'bn' ? 'আমাদের বিভিন্ন সামাজিক ও শিক্ষামূলক কার্যক্রমের এক ঝলক।' : 'A glimpse of our various social and educational activities.'}
          </p>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {act.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{act.title}</h3>
              <p className="text-slate-600 leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
