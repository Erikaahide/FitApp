import { useEffect, useMemo, useState } from 'react';
import { Search, CheckSquare, Square, ClipboardCheck, Trash2, X } from 'lucide-react';
import { SHOPPING_DATA, ALL_ITEMS } from '../data/shoppingList';

const LS_KEY = 'fitapp:shopping:v1';

export default function ShoppingList() {
  // seleccionados
  const [selected, setSelected] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(selected)));
  }, [selected]);

  // Filtrado por texto (vista actual)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SHOPPING_DATA;
    return SHOPPING_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(it => it.name.toLowerCase().includes(q)),
    })).filter(cat => cat.items.length > 0);
  }, [query]);

  const totalCount = ALL_ITEMS.length;
  const selectedCount = selected.size;
  const filteredCount = filtered.reduce((acc, c) => acc + c.items.length, 0);
  const hasFiltered = filteredCount > 0;

  // Acciones masivas sobre la VISTA ACTUAL (lo que estás viendo)
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

  const copySelected = async () => {
    const map = new Map(); // cat -> [items]
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
    } catch { console.log(text); }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <section className="card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-semibold">Lista de compras</h1>
          <span className="text-sm text-foreground/70">
            {selectedCount}/{totalCount} seleccionados
          </span>
          {query && (
            <span className="text-sm text-foreground/70">
              • {filteredCount} resultados
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Buscador */}
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
                aria-label="Limpiar búsqueda"
                title="Limpiar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Acciones – aclara que actúan sobre la vista actual */}
          <button
            className="btn btn-ghost disabled:opacity-50 disabled:pointer-events-none"
            onClick={markView}
            disabled={!hasFiltered}
            title="Marcar todo lo que estás viendo"
          >
            <CheckSquare className="h-4 w-4 mr-2" /> Marcar
          </button>
          <button
            className="btn btn-ghost disabled:opacity-50 disabled:pointer-events-none"
            onClick={clearView}
            disabled={!hasFiltered}
            title="Desmarcar lo que estás viendo"
          >
            <Square className="h-4 w-4 mr-2" /> Limpiar vista
          </button>
          <button className="btn btn-primary" onClick={copySelected} title="Copiar seleccionados">
            <ClipboardCheck className="h-4 w-4 mr-2" /> Copiar
          </button>
          <button className="btn btn-ghost" onClick={clearAll} title="Limpiar todo">
            <Trash2 className="h-4 w-4 mr-2" /> Limpiar todo
          </button>
        </div>
      </section>

      {/* Info breve de ayuda */}
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

      {/* Grid fluido que acomoda pills y evita cortes raros */}
      <ul className="grid gap-2 grid-autofit">
        {category.items.map(item => {
          const isOn = selected.has(item.id);
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className={[
                  'w-full min-h-10 rounded-2xl border flex items-center justify-between gap-3 px-3 py-2 text-left',
                  'transition focus:outline-none focus:ring-2 focus:ring-primary/60',
                  isOn ? 'bg-primary text-white border-transparent' : 'hover:bg-primary/5'
                ].join(' ')}
                aria-pressed={isOn}
              >
                <span className={['flex-1 pr-2 leading-tight', isOn ? 'font-medium' : ''].join(' ')}>
                  {item.name}
                </span>
                <span
                  className={[
                    'h-4 w-4 rounded-full border flex-shrink-0',
                    isOn ? 'bg-white' : 'border-foreground/30'
                  ].join(' ')}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
