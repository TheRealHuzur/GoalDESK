import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type Mode = 'login' | 'register';

export function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: sbError } = await supabase.auth.signInWithPassword({ email, password });
        if (sbError) throw sbError;
        navigate('/');
      } else {
        const { error: sbError } = await supabase.auth.signUp({ email, password });
        if (sbError) throw sbError;
        setSuccess('Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse.');
        setMode('login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-desk-bg flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-desk-text">
            <span className="text-desk-text">Goal</span>
            <span className="text-desk-sky">DESK</span>
          </h1>
          <p className="text-desk-text-muted text-sm mt-1">Persönliche Ziel-Visualisierung</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-desk-border rounded-[14px] p-6 shadow-desk transition-colors duration-300">
          {/* Tab switcher */}
          <div className="flex rounded-[10px] bg-desk-bg-3 p-1 mb-6 border border-desk-border">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(null); setSuccess(null); }}
                className={[
                  'flex-1 py-1.5 text-sm font-medium rounded-md transition-colors',
                  mode === m
                    ? 'bg-slate-700 text-slate-100'
                    : 'text-slate-500 hover:text-slate-300',
                ].join(' ')}
              >
                {m === 'login' ? 'Anmelden' : 'Registrieren'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="du@beispiel.de"
              required
              autoComplete="email"
            />
            <Input
              label="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
            />

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2">
                {success}
              </div>
            )}

            <Button type="submit" loading={loading} size="lg" className="mt-1 w-full">
              {mode === 'login' ? 'Anmelden' : 'Konto erstellen'}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">ODER</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full flex items-center justify-center gap-2 mb-2"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: 'https://goaldesk.wissen-und-werkzeug.de'
                  }
                });
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Mit Google {mode === 'login' ? 'anmelden' : 'registrieren'}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Teil der{' '}
          <span className="text-slate-500">DESK</span>
          <span className="text-sky-500">SUITE</span>
        </p>
      </div>
    </div>
  );
}
