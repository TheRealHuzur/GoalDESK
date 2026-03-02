import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isDemoMode } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <header className="h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 h-full flex items-center max-w-7xl">
        <div className="flex items-center gap-3 flex-1">
          {/* DESK-Suite Branding: Präfix weiß, "DESK" in DESK-Blau */}
          <span className="font-bold text-lg tracking-tight select-none">
            <span className="text-white">Goal</span>
            <span className="text-sky-400">DESK</span>
          </span>
        </div>

        <nav className="flex items-center gap-2">
          {isDemoMode ? (
            <span className="text-xs text-amber-400/70 font-medium">Demo</span>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Abmelden
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
