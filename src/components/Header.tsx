import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const Header: React.FC = () => {
  const { translation, language, toggleLanguage, toggleTheme, theme, isLoggedIn } = useApp();
  const location = useLocation();

  const userRaw = sessionStorage.getItem('mp_user');
  const user = userRaw ? JSON.parse(userRaw) : null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card shadow-lg sticky top-0 z-50 manga-transition border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 flex-wrap gap-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-primary/80 manga-transition"
          >
            {translation.siteName}
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="rounded-full min-w-[50px]"
            >
              {language.code === 'ar' ? 'FR' : 'AR'}
            </Button>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={isActive('/') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}>
              {translation.home}
            </Link>
            <Link to="/browse" className={isActive('/browse') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}>
              {translation.browse}
            </Link>
            <Link to="/popular" className={isActive('/popular') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}>
              {translation.popular}
            </Link>
            <Link to="/latest" className={isActive('/latest') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'}>
              {translation.latest}
            </Link>

            {isLoggedIn && user ? (
              <Link to="/profile">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold hover:opacity-80 transition">
                  {user.name
                    .split(' ')
                    .map((s: string) => s[0].toUpperCase())
                    .slice(0, 2)
                    .join('')}
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm">{translation.login}</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
