
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, BookOpen, Calendar, Image as ImageIcon, Phone, LogIn, ChevronRight, GraduationCap, Heart, Shield, Languages, LayoutDashboard, UserPlus } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import MissionVisionPage from './pages/MissionVisionPage';
import ActivitiesPage from './pages/ActivitiesPage';
import NoticePage from './pages/NoticePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SupporterFormPage from './pages/SupporterFormPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isDashboard = location.pathname === '/dashboard';

  const navItems = [
    { label: t('nav.home'), path: '/', icon: <Home size={18} /> },
    { label: t('nav.about'), path: '/about', icon: <Info size={18} /> },
    { label: t('nav.history'), path: '/history', icon: <BookOpen size={18} /> },
    { label: t('nav.mission'), path: '/mission', icon: <Shield size={18} /> },
    { label: t('nav.activities'), path: '/activities', icon: <Calendar size={18} /> },
    { label: t('nav.notice'), path: '/notice', icon: <Calendar size={18} /> },
    { label: t('nav.gallery'), path: '/gallery', icon: <ImageIcon size={18} /> },
    { label: t('nav.contact'), path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/2/27/Bangladesh_Islami_Chhatra_Shibir_Logo.svg" 
                alt="BICS Logo" 
                className="w-16 h-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-emerald-900 font-bold leading-tight text-base md:text-lg">
                  {t('nav.orgName')}
                </span>
                <span className="text-emerald-600 text-xs md:text-sm font-bold tracking-wide">
                  {t('nav.branchName')}
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center bg-slate-100 rounded-full p-1 mr-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'bn' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
              >
                বাংলা
              </button>
            </div>
            {!isDashboard && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                  location.pathname === item.path ? 'text-emerald-700' : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isDashboard ? (
              <Link
                to="/login"
                className="bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-emerald-800 transition-all"
              >
                <LogIn size={16} /> {t('nav.login')}
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="text-emerald-700 font-bold flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> {t('nav.dashboard')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
             <button 
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="text-slate-600 hover:text-emerald-700 p-2 flex items-center gap-1"
            >
              <Languages size={20} />
              <span className="text-xs font-bold">{language === 'en' ? 'BN' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-700 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 animate-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-emerald-700 text-white font-medium"
          >
            <LogIn size={18} />
            <span>{t('nav.login')}</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">BICS Shoronkhola South</h3>
          <p className="text-emerald-200/80 text-sm leading-relaxed">
             Bangladesh Islami Chhatra Shibir, Shoronkhola South branch.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
            <li><Link to="/mission" className="hover:text-white transition-colors">{t('nav.mission')}</Link></li>
            <li><Link to="/activities" className="hover:text-white transition-colors">{t('nav.activities')}</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <p className="text-emerald-200/80 text-xs leading-relaxed mb-4">
            Official informational portal for student development and community welfare in Shoronkhola South.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-emerald-900 text-center text-xs text-emerald-500">
        &copy; {new Date().getFullYear()} Bangladesh Islami Chhatra Shibir, Shoronkhola South branch. All Rights Reserved.
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/mission" element={<MissionVisionPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/become-supporter" element={<SupporterFormPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
