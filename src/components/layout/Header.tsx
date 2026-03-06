import { useNavigate } from 'react-router-dom';
import { supabase, isDemoMode } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <header className="h-[56px] bg-desk-bg-2/80 backdrop-blur-[14px] border-b border-desk-border sticky top-0 z-40 transition-colors duration-300">
      <div className="container mx-auto px-6 h-full flex items-center max-w-[900px]">

        {/* Breadcrumb Branding */}
        <div className="flex items-center flex-1 text-[20px] leading-none">
          <a
            href="https://desk-suite.wissen-und-werkzeug.de/"
            className="font-extrabold tracking-tight hover:opacity-70 transition-opacity"
          >
            <span className="text-desk-text">DESK</span>
            <span className="text-desk-sky">suite</span>
          </a>
          <span className="text-desk-text-muted mx-[8px] font-normal">›</span>
          <span className="font-extrabold tracking-tight select-none">
            <span className="text-desk-text">Goal</span>
            <span className="text-desk-sky">DESK</span>
          </span>
        </div>

        <nav className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-desk-text-muted hover:text-desk-text transition-colors p-1 flex items-center justify-center mr-2"
            title="Theme wechseln"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {isDemoMode ? (
            <span className="text-xs text-amber-400/70 font-medium">Demo</span>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
              Abmelden
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
