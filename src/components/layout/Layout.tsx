import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}
