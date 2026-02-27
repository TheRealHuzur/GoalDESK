import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase, isDemoMode } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Auth } from '@/pages/Auth';

function ProtectedRoute({ children, session }: { children: React.ReactNode; session: Session | null }) {
  if (!isDemoMode && !session) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function PublicRoute({ children, session }: { children: React.ReactNode; session: Session | null }) {
  if (isDemoMode || session) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-500 text-sm">Lade GoalDESK…</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isDemoMode && (
        <div className="fixed top-0 inset-x-0 z-50 bg-amber-500/10 border-b border-amber-500/30 px-4 py-1.5 text-center text-xs text-amber-400">
          Demo-Modus – Daten werden lokal gespeichert. Füge Supabase-Credentials in{' '}
          <code className="font-mono">.env</code> ein für den vollen Funktionsumfang.
        </div>
      )}
      <div className={isDemoMode ? 'pt-8' : ''}>
        <Routes>
          <Route
            path="/auth"
            element={
              <PublicRoute session={session}>
                <Auth />
              </PublicRoute>
            }
          />
          <Route
            element={
              <ProtectedRoute session={session}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
