
import React from 'react';
import { useLanguage } from '../LanguageContext';

const GalleryPage = () => {
  const { t } = useLanguage();

  React.useEffect(() => {
    document.title = `${t('galleryPage.title')} | BICS Shoronkhola South`;
  }, [t]);

  const captions = t('galleryPage.captions') || [];
  const photos = [
    { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", caption: captions[0] },
    { url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", caption: captions[1] },
    { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800", caption: captions[2] },
    { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", caption: captions[3] },
    { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", caption: captions[4] },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", caption: captions[5] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">{t('galleryPage.title')}</h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('galleryPage.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl bg-slate-200 aspect-[4/3] cursor-pointer">
            <img 
              src={p.url} 
              alt={p.caption} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-medium">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
