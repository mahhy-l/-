
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { ImageIcon, Maximize2 } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { t, language } = useLanguage();

  const images = [
    { src: 'https://picsum.photos/seed/bics1/800/600', title: language === 'bn' ? 'শিক্ষা সামগ্রী বিতরণ' : 'Education Material Distribution' },
    { src: 'https://picsum.photos/seed/bics2/800/600', title: language === 'bn' ? 'বৃক্ষরোপণ কর্মসূচি' : 'Tree Plantation Program' },
    { src: 'https://picsum.photos/seed/bics3/800/600', title: language === 'bn' ? 'আলোচনা সভা' : 'Discussion Meeting' },
    { src: 'https://picsum.photos/seed/bics4/800/600', title: language === 'bn' ? 'ইফতার মাহফিল' : 'Iftar Mahfil' },
    { src: 'https://picsum.photos/seed/bics5/800/600', title: language === 'bn' ? 'সাংস্কৃতিক অনুষ্ঠান' : 'Cultural Event' },
    { src: 'https://picsum.photos/seed/bics6/800/600', title: language === 'bn' ? 'রক্তদান ক্যাম্প' : 'Blood Donation Camp' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mb-6">
            <ImageIcon size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif">{t('nav.gallery')}</h1>
          <div className="w-24 h-1.5 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <div key={i} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-white font-bold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-emerald-900 transition-all">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
