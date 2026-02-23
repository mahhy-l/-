
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { BookOpen, Calendar, History } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mb-6">
            <History size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('nav.history')}</h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-emerald max-w-none text-slate-600 leading-relaxed text-lg">
          {language === 'bn' ? (
            <div className="space-y-6">
              <p>
                বাংলাদেশ ইসলামী ছাত্রশিবির ১৯৭৭ সালের ৬ই ফেব্রুয়ারি ঢাকা বিশ্ববিদ্যালয়ের কেন্দ্রীয় জামে মসজিদ থেকে যাত্রা শুরু করে। একদল মেধাবী ও আদর্শবান ছাত্রের হাত ধরে এই সংগঠনের জন্ম হয়।
              </p>
              <p>
                প্রতিষ্ঠালগ্ন থেকেই ছাত্রশিবির ছাত্রদের চারিত্রিক সংশোধন, শিক্ষা ব্যবস্থার আমূল পরিবর্তন এবং একটি ইনসাফপূর্ণ সমাজ গঠনের লক্ষ্যে কাজ করে যাচ্ছে। শরণখোলা দক্ষিণ শাখাও এই মহান লক্ষ্যকে সামনে রেখে স্থানীয় ছাত্রসমাজের কল্যাণে কাজ করে আসছে।
              </p>
              <p>
                আমাদের ইতিহাস ত্যাগের ইতিহাস। অসংখ্য প্রতিকূলতা পেরিয়ে আজ ছাত্রশিবির বাংলাদেশের ছাত্রসমাজের হৃদয়ে স্থান করে নিয়েছে।
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p>
                Bangladesh Islami Chhatra Shibir began its journey on February 6, 1977, from the Central Mosque of Dhaka University. The organization was founded by a group of talented and idealistic students.
              </p>
              <p>
                Since its inception, Chhatra Shibir has been working towards the character building of students, radical changes in the education system, and the establishment of a just society. Shoronkhola South branch has also been working for the welfare of the local student community with these noble goals.
              </p>
              <p>
                Our history is a history of sacrifice. Overcoming numerous obstacles, Chhatra Shibir has earned a place in the hearts of the student community of Bangladesh.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
