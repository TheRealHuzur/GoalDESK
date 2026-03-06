import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="font-sans">
      <Header />
      <main className="container mx-auto pt-[48px] px-6 pb-[80px] max-w-[900px] page">
        <Outlet />
      </main>
    </div>
  );
}
