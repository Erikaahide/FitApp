import { NavLink } from 'react-router-dom';
import { Home, Calculator, LayoutDashboard, Utensils, ShoppingCart, BookOpen, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);
  return (
    <button className="btn btn-ghost" aria-label="Cambiar tema" onClick={() => setDark(d => !d)}>
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/calculator', label: 'Calculadora', Icon: Calculator },
  { to: '/plan', label: 'Plan', Icon: LayoutDashboard },
  { to: '/day', label: 'Día', Icon: Utensils },
  { to: '/shopping-list', label: 'Compras', Icon: ShoppingCart },
  { to: '/blog', label: 'Blog', Icon: BookOpen },
];

export default function Navbar() {
  return (
    <>
      {/* Top bar (desktop/tablet) */}
      <header className="sticky top-0 z-40 hidden md:block border-b bg-card/80 backdrop-blur">
        <div className="container max-w-5xl h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-primary" aria-hidden />
            <span className="font-semibold">FitApp</span>
          </div>

          <nav className="flex items-center gap-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-2xl hover:bg-muted ${isActive ? 'bg-muted font-semibold' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-card">
        <ul className="grid grid-cols-5">
          {navItems.filter((_, i) => i < 5).map(({ to, label, Icon }) => (
            <li key={to} className="flex">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center justify-center h-16 text-xs gap-1
                   ${isActive ? 'text-primary font-medium' : ''}`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
