import { Link } from 'react-router-dom';
import {
  Calculator,
  Calendar,
  Utensils,
  MessageCircleHeart,
  ShoppingCart,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="card p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-3 py-1 text-primary border border-primary/20">
              {/* <Sparkles className="h-4 w-4" /> */}
              <span className="text-sm font-medium">Tu compañero de macros</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Hola! <span className="text-primary">✨</span>
            </h1>
            <p className="text-sm md:text-base text-foreground/80 max-w-prose">
              Calcula tus macros, visualiza tu plan y registra tus comidas diarias — todo en un solo lugar.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/calculator" className="btn btn-primary">
                Calcular mis macros
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/day" className="btn btn-ghost">
                Registrar comida
              </Link>
            </div>
          </div>

          {/* Sello decorativo */}
          <div className="hidden md:block">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Sugerencia contextual */}
      <section className="card p-4 md:p-5 flex items-center justify-between gap-4">
        <div className="text-sm md:text-base">
          <p className="font-medium">¿Aún sin objetivos?</p>
          <p className="text-foreground/70">
            Empieza con la calculadora para obtener tu plan diario de proteínas, carbos y grasas.
          </p>
        </div>
        <Link to="/calculator" className="btn btn-primary">Ir a la calculadora</Link>
      </section>

      {/* Accesos rápidos (como tu mock, solo iconos) */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <HomeQuickLink to="/calculator" label="Calculadora" Icon={Calculator} />
        <HomeQuickLink to="/plan" label="Calendario" Icon={Calendar} />
        <HomeQuickLink to="/day" label="Plan" Icon={Utensils} />
        <HomeQuickLink to="/blog" label="Blog" Icon={MessageCircleHeart} />
        <HomeQuickLink to="/shopping-list" label="Compras" Icon={ShoppingCart} />
      </section>
    </div>
  );
}

/** Tarjeta compacta de acceso rápido */
function HomeQuickLink({ to, label, Icon }) {
  return (
    <Link
      to={to}
      className="group card py-4 px-3 flex items-center justify-center gap-2 hover:bg-primary/5 transition"
    >
      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition" />
      <span className="text-sm font-medium text-foreground/90">{label}</span>
    </Link>
  );
}

  