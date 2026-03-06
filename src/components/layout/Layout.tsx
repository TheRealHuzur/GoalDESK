import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto pt-[48px] px-6 pb-[80px] max-w-[900px] page flex-1">
        <Outlet />
      </main>

      <footer className="footer">
        <div style={{ marginBottom: '8px' }}>
          <a href="https://www.wissen-und-werkzeug.de">wissen-und-werkzeug.de</a> · Werkzeuge für den Arbeitsalltag
        </div>
        <div>
          <a href="https://wissen-und-werkzeug.de/impressum/">Impressum</a> ·{' '}
          <a href="https://datenschutz.wissen-und-werkzeug.de/">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}
