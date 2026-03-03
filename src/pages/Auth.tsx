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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Goal</span>
            <span className="text-sky-400">DESK</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Persönliche Ziel-Visualisierung</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
          {/* Tab switcher */}
          <div className="flex rounded-lg bg-slate-900 p-1 mb-6">
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
