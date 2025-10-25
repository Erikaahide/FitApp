import { useParams } from "react-router-dom";
import { usePlan } from "../context/PlanContext";

// Importa las listas
import { maintainList } from "../../data/maintainList.js";
import { ketoList } from "../../data/ketoList.js";
import { cutList } from "../../data/cutList.js";
import { bulkList } from "../../data/bulkList.js";

const plans = {
  maintain: maintainList,
  keto: ketoList,
  cut: cutList,
  bulk: bulkList,
};

export default function MealEditor() {
  const { name } = useParams();
  const { activePlan } = usePlan();
  const planData = plans[activePlan];
  const mealData = planData?.[name.toLowerCase()];

  if (!mealData) {
    return (
      <section className="container-app py-10 text-center">
        <p className="text-lg text-[hsl(var(--fg))]">
          No hay datos para esta comida ({name}) en el plan <b>{activePlan}</b>.
        </p>
      </section>
    );
  }

  return (
    <section className="container-app py-10 bg-[hsl(var(--bg))] text-[hsl(var(--fg))] transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {name} · <span className="text-[hsl(var(--primary))]">{activePlan}</span>
      </h2>

      {Object.entries(mealData).map(([category, items]) => (
        <Category key={category} title={capitalize(category)}>
          {items.map((food, idx) => (
            <FoodCard
              key={idx}
              name={food.name}
              portion={food.portion}
              img={food.img || "placeholder.jpg"}
            />
          ))}
        </Category>
      ))}
    </section>
  );
}

function Category({ title, children }) {
  const colors = {
    Proteina: "bg-[hsl(var(--cat-protein))]",
    Hidratos: "bg-[hsl(var(--cat-carbs))]",
    Lipidos: "bg-[hsl(var(--cat-lipids))]",
    Verduras: "bg-[hsl(var(--cat-veggies))]",
  };
  const bgColor = colors[title] || "bg-[hsl(var(--card))]";

  return (
    <div className={`p-6 mb-10 rounded-2xl border border-[hsl(var(--border))] shadow-soft ${bgColor}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-autofit gap-4">{children}</div>
    </div>
  );
}

function FoodCard({ name, portion, img }) {
  return (
    <div className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] rounded-2xl p-4 shadow-soft hover:shadow-md transition">
      <img
        src={`/assets/${img}`}
        alt={name}
        className="w-full h-28 object-cover rounded-xl mb-3 bg-[hsl(var(--muted))]"
      />
      <h4 className="font-semibold text-sm">{name}</h4>
      <p className="text-xs opacity-80 mb-2">Porción: {portion}</p>
      <button className="btn-primary w-full text-sm py-1.5 rounded-xl">+ Agregar</button>
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
