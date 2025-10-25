import { useParams } from "react-router-dom";

export default function MealEditor() {
  const { name } = useParams();

  return (
    <section className="container-app py-10 bg-[hsl(var(--bg))] text-[hsl(var(--fg))] transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 capitalize">{name}</h2>

      <div className="space-y-10">
        {/* === PROTEÍNA === */}
        <Category title="Proteína" color="bg-[hsl(var(--cat-protein))]">
          <FoodCard name="Huevo" portion="1 pz" img="huevo.jpg" />
          <FoodCard name="Queso panela" portion="30 g" img="queso.jpg" />
          <FoodCard name="Yogurt griego sin azúcar" portion="1/4 taza" img="yogurt.jpg" />
        </Category>

        {/* === HIDRATOS DE CARBONO === */}
        <Category title="Hidratos de carbono" color="bg-[hsl(var(--cat-carbs))]">
          <FoodCard name="Tortilla de maíz" portion="1 pz" img="tortilla.jpg" />
          <FoodCard name="Arroz cocido" portion="50 g" img="arroz.jpg" />
          <FoodCard name="Pan zero" portion="1 pz" img="pan.jpg" />
        </Category>

        {/* === LÍPIDOS === */}
        <Category title="Lípidos" color="bg-[hsl(var(--cat-lipids))]">
          <FoodCard name="Mantequilla" portion="1 cda" img="mantequilla.jpg" />
          <FoodCard name="Crema ácida" portion="1 cda" img="crema.jpg" />
        </Category>

        {/* === VERDURAS === */}
        <Category title="Verduras" color="bg-[hsl(var(--cat-veggies))]">
          <FoodCard name="Espinacas" portion="1 taza" img="espinacas.jpg" />
          <FoodCard name="Nopales" portion="1/2 taza" img="nopales.jpg" />
          <FoodCard name="Brócoli" portion="1 taza" img="brocoli.jpg" />
        </Category>
      </div>
    </section>
  );
}

/* === SUBCOMPONENTES === */
function Category({ title, color, children }) {
  return (
    <div className={`p-6 rounded-2xl shadow-soft border border-[hsl(var(--border))] ${color}`}>
      <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--fg))]">{title}</h3>
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
      <button className="btn-primary w-full text-sm py-1.5 rounded-xl">
        + Agregar
      </button>
    </div>
  );
}
