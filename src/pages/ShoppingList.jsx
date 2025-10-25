import { useEffect, useMemo, useState } from 'react';
import { Search, CheckSquare, Square, ClipboardCheck, Trash2, X } from 'lucide-react';
import { SHOPPING_PLANS } from '../../data/shoppingListsIndex';

const LS_KEY_BASE = 'fitapp:shopping:v1';

export default function ShoppingList() {
  // Estado del plan activo
  const [plan, setPlan] = useState('maintain'); // puedes cambiar por 'bulk', 'cut', 'keto'

  // Estado de seleccionados (por plan)
  const [selected, setSelected] = useState(() => {
    try {
      const raw = localStorage.getItem(`${LS_KEY_BASE}:${plan}`);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  // Estado de búsqueda
  const [query, setQuery] = useState('');

  // Guarda la selección específica del plan activo
  useEffect(() => {
    localStorage.setItem(`${LS_KEY_BASE}:${plan}`, JSON.stringify([...selected]));
  }, [selected, plan]);

  // Reinicia selección al cambiar de plan
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${LS_KEY_BASE}:${plan}`);
      setSelected(new Set(raw ? JSON.parse(raw) : []));
    } catch {
      setSelected(new Set());
    }
  }, [plan]);

  // Datos del plan actual
  const SHOPPING_DATA = SHOPPING_PLANS[plan];
  const ALL_ITEMS = SHOPPING_DATA.flatMap(c => c.items); //  ya contienen {id, name}

  // Filtrado
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHOPPING_DATA;
    return SHOPPING_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(it => it.name.toLowerCase().includes(q)), // ✅ usar .name
    })).filter(cat => cat.items.length > 0);
  }, [query, plan]);

  const totalCount = ALL_ITEMS.length;
  const selectedCount = selected.size;
  const filteredCount = filtered.reduce((acc, c) => acc + c.items.length, 0);
  const hasFiltered = filteredCount > 0;

  // ⚡ Acciones masivas
  const markView = () => {
    const ids = filtered.flatMap(c => c.items.map(i => i.id));
    setSelected(prev => new Set([...prev, ...ids]));
  };

  const clearView = () => {
    const idsToClear = new Set(filtered.flatMap(c => c.items.map(i => i.id)));
    setSelected(prev => {
      const next = new Set(prev);
      idsToClear.forEach(id => next.delete(id));
      return next;
    });
  };

  const clearAll = () => setSelected(new Set());

  // Copiar al portapapeles
  const copySelected = async () => {
    const map = new Map();
    SHOPPING_DATA.forEach(c => map.set(c.label, []));
    selected.forEach(id => {
      const [catKey] = id.split(':');
      const cat = SHOPPING_DATA.find(c => c.key === catKey);
      const item = ALL_ITEMS.find(i => i.id === id);
      if (cat && item) map.get(cat.label).push(item.name);
    });

    const lines = [];
    for (const [cat, items] of map.entries()) {
      if (!items.length) continue;
      lines.push(`${cat}:`);
      items.sort().forEach(n => lines.push(`• ${n}`));
      lines.push('');
    }

    const text = lines.join('\n').trim();
    try {
      await navigator.clipboard.writeText(text || '—');
      alert('Lista copiada al portapapeles ✅');
    } catch {
      console.log(text);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-lg md:text-xl font-semibold">Lista de compras ({plan})</h1>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="rounded-xl bg-card border px-3 py-2 text-sm"
          >
            <option value="bulk">Bulk</option>
            <option value="maintain">Maintain</option>
            <option value="cut">Cut sin lácteos</option>
            <option value="keto">Keto sin lácteos</option>
          </select>
          <span className="text-sm text-foreground/70">
            {selectedCount}/{totalCount} seleccionados
          </span>
          {query && (
            <span className="text-sm text-foreground/70">
              • {filteredCount} resultados
            </span>
          )}
        </div>

        {/* Acciones */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Buscar */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar alimento…"
              className="h-10 w-56 rounded-2xl border bg-card pl-9 pr-9 outline-none focus:ring-2 focus:ring-primary/60"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-primary/10 text-foreground/70"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            className="btn btn-ghost disabled:opacity-50 disabled:pointer-events-none"
            onClick={markView}
            disabled={!hasFiltered}
          >
            <CheckSquare className="h-4 w-4 mr-2" /> Marcar
          </button>
          <button
            className="btn btn-ghost disabled:opacity-50 disabled:pointer-events-none"
            onClick={clearView}
            disabled={!hasFiltered}
          >
            <Square className="h-4 w-4 mr-2" /> Limpiar vista
          </button>
          <button className="btn btn-primary" onClick={copySelected}>
            <ClipboardCheck className="h-4 w-4 mr-2" /> Copiar
          </button>
          <button className="btn btn-ghost" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-2" /> Limpiar todo
          </button>
        </div>
      </section>

      <p className="text-xs text-foreground/60 px-1">
        Tip: Las acciones <em>Marcar</em> y <em>Limpiar vista</em> aplican sobre la lista que ves (con o sin filtro).
      </p>

      {/* Categorías */}
      <div className="space-y-4">
        {filtered.map(cat => (
          <CategoryBlock
            key={cat.key}
            category={cat}
            selected={selected}
            toggle={(id) => setSelected(prev => {
              const next = new Set(prev);
              next.has(id) ? next.delete(id) : next.add(id);
              return next;
            })}
          />
        ))}
        {filtered.length === 0 && (
          <div className="card p-6 text-center text-foreground/70">
            No encontramos resultados para <span className="font-medium">“{query}”</span>.
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Componentes ---------- */
function CategoryBlock({ category, selected, toggle }) {
  const done = category.items.filter(i => selected.has(i.id)).length;

  return (
    <section className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">
          {category.label}{' '}
          <span className="text-foreground/60 text-sm">
            ({done}/{category.items.length})
          </span>
        </h2>
      </div>

      <ul className="grid gap-2 grid-autofit">
        {category.items.map(item => {
          const isOn = selected.has(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className={[
                  'w-full min-h-10 rounded-2xl border flex items-center justify-center px-3 py-2 text-center',
                  'transition focus:outline-none focus:ring-2 focus:ring-primary/60',
                  isOn
                    ? 'bg-primary text-white border-transparent font-medium'
                    : 'hover:bg-primary/5 text-foreground/90'
                ].join(' ')}
                aria-pressed={isOn}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
