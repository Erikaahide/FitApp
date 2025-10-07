import { Link, NavLink } from 'react-router-dom';
import { Calculator,  Calendar, Utensils, ShoppingCart, MessageCircleHeart, Sun, Moon } from 'lucide-react';
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
      <button
        className="btn btn-primary h-10 w-10 p-0 rounded-2xl shadow-soft"
        aria-label={dark ? 'Cambiar a claro' : 'Cambiar a oscuro'}
        onClick={() => setDark(d => !d)}
        title={dark ? 'Tema claro' : 'Tema oscuro'}
      >
        {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    );
  }
  

const navItems = [
  { to: '/calculator', label: 'Calculadora', Icon: Calculator },
  { to: '/plan', label: 'Progreso', Icon: Calendar },
  { to: '/day', label: 'Plan', Icon: Utensils },
  { to: '/blog', label: 'Blog', Icon: MessageCircleHeart },
  { to: '/shopping-list', label: 'Compras', Icon: ShoppingCart },
];

export default function Navbar() {
  return (
    <>
      {/* Top bar (desktop/tablet) */}
      <header className="sticky top-0 z-40 hidden md:block">
        <div className="container max-w-5xl py-3">
          <div className="h-16 rounded-2xl border bg-muted px-4 flex items-center justify-between">
            {/* Marca -> Home */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-2xl font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary/60 rounded-md"
                aria-label="Ir al inicio"
              >
                FitApp
              </Link>
            </div>

            {/* Nav icons derecha */}
            <nav className="flex items-center gap-3">
              {navItems.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'h-10 px-3 rounded-2xl flex items-center gap-2 transition',
                      isActive
                        ? 'bg-primary text-white shadow-soft'
                        : 'text-primary hover:bg-primarySoft'
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="h-5 w-5" />
                      {isActive && <span className="text-sm font-medium">{label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-card">
        <ul className="grid grid-cols-5">
          {navItems.slice(0, 5).map(({ to, label, Icon }) => (
            <li key={to} className="flex">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center justify-center h-16 text-xs gap-1
                   ${isActive ? 'text-primary font-medium' : 'text-foreground'}`
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
