import { useNavigate } from "react-router-dom";

export default function DayDetail() {
  const navigate = useNavigate();

  const handleEdit = (mealName) => {
    navigate(`/meal/${mealName.toLowerCase()}`);
  };

  const meals = [
    { id: 1, name: "Desayuno", progress: 80, color: "bg-[hsl(var(--meal-desayuno))]" },
    { id: 2, name: "Snack", progress: 72, color: "bg-[hsl(var(--meal-snack))]" },
    { id: 3, name: "Comida", progress: 61, color: "bg-[hsl(var(--meal-comida))]" },
    { id: 4, name: "Snack", progress: 72, color: "bg-[hsl(var(--meal-snack))]" },
    { id: 5, name: "Cena", progress: 72, color: "bg-[hsl(var(--meal-cena))]" },
  ];

  return (
    <section className="min-h-screen flex flex-col lg:flex-row rounded-3xl overflow-hidden transition-colors duration-300 bg-[hsl(var(--bg))] text-[hsl(var(--fg))]">
      
      {/* === PANEL IZQUIERDO: RESUMEN === */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-10 text-center bg-gradient-to-b from-[hsl(var(--primary-soft))] to-[hsl(var(--primary))] text-white">
        <h2 className="text-2xl font-bold mb-4">Resumen</h2>
        <div className="bg-white/20 rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-inner backdrop-blur-sm">
          <p className="text-6xl font-bold">76</p>
          <p className="text-sm opacity-90">de 100</p>
        </div>
        <p className="mt-6 text-xl font-semibold">Súper</p>
        <p className="text-sm opacity-90">Casi lo consigues, ¡continúa!</p>
      </div>

      {/* === PANEL DERECHO: DETALLE DE COMIDAS === */}
      <div className="lg:w-1/2 p-8 relative bg-[hsl(var(--card))] transition-colors duration-300">
        <button
          className="btn btn-ghost absolute top-6 right-6 text-sm"
          onClick={() => handleEdit("Desayuno")}
        >
          Editar/Añadir
        </button>

        <div className="space-y-4 mt-8 flex-1 flex flex-col justify-center">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`flex justify-between items-center p-4 rounded-xl border border-[hsl(var(--border))] shadow-soft hover:shadow-md transition ${meal.color}`}
            >
              <span className="font-medium">{meal.name}</span>
              <span className="text-sm opacity-80">{meal.progress} / 100</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
