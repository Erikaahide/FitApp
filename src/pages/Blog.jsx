import React from "react";

export default function Blog() {
  const tips = [
    {
      title: "La importancia de la hidratación",
      text: `Recuerda que tomar aqua no solo te mantendrá hidratado, también ayuda a mantenerte satisfecho y evitar mal humor, regula la temperatura corporal, mejora la recuperación muscular y previene fatiga. Es esencial para el rendimiento físico y mental. 
      Cantidad de agua diaria: 3-4 litros (para poder cumplir con hidratación diaria electrolitos sin azúcar).`,
    },
    {
      title: "Descanso de calidad",
      text: `El sueño profundo es el momento en que tu cuerpo se recupera y genera masa muscular. Duerme 7-8 horas por lo menos, apaga las luces u oscurece, procurando una temperatura promedio de 18 a 21° grados centígrados dentro de tu cuarto previo a dormir, esto facilitará dormir profundamente. Descanso de calidad reduce el estrés, mejora la energía y potencia tu rendimiento en el gym.`,
    },
    {
      title: "Salud mental",
      text: `La terapia psicológica y el manejo correcto de emociones te brindaran un pilar fuerte para que tengas éxito y cumplas tus objetivos. Tomate fotos 1 vez por semana, observa tu digestión, mide tus niveles de energía, tu rendimiento laboral y escolar debe mejorar también.
      Busca hábitos que disminuyan tu estrés, respirar profundo, meditar, busca momentos de relajación y trabaja en tu introspección constantemente.`,
    },
    {
      title: "Hábitos",
      text: `Evita malos hábitos como desvelo, fumar e ingerir bebidas alcohólicas o cualquier tipo de drogas, ya que está comprobado que interrumpen las señales de preservación de masa muscular o impide crecimiento, retarda el cumplimiento de tus objetivos, si lo evitas aprovecharás el plan de alimentación al máximo.`,
    },
    {
      title: "Cardio",
      text: `Juega un papel muy importante en obtener los resultados esperados, no lo subestimes.
      Caminadora, escaladora, bicicleta, cuerda: 35 min en ayunas o despues de entrenar. Trata de mantener frecuencia cardiaca de 148bpm.`,
    },
    {
      title: "Probióticos: tu aliado digestivo",
      text: `Un sistema digestivo sano mejora la absorción de nutrientes. Consumir probióticos de 30 billones UFC, como kefir o búlgaros, fortalece la microbiota intestinal y ayuda a disminuir la inflamación.`,
    },
    {
      title: "Alimentos libres",
      text: `- Especias en general como el laurel, orégano, comino, pimienta, paprika, curry, jengibre,cebolla, ajo, clavo,tomillo,etc.
      - Café negro.
      - Refresco Light.
      - Té o infusiones de hojas naturales.
      - Stevia, Splendao Monk Fruit.`,
    },
    {
      title: "Arroz Jazmín: energía rápida",
      text: `El arroz jazmín es un carbohidrato de fácil digestión, ideal como fuente de energía antes o después de entrenar. Su índice glucémico moderado lo hace perfecto para reponer glucógeno muscular.`,
    },
    {
      title: "Gelatina casera",
      text: `Evita edulcorantes, prepara gelatina casera con grenetina e infusión de jamaica sin azúcar es una alternativa saludable y deliciosa para tus snacks. La grenetina aporta colágeno, que fortalece articulaciones, piel y cabello. `,
    },
    {
      title: "Snacks: max. 1 al día",
      text: `- Bowl de fruta antes de las 7pm (cualquiera está permitida).
- Yogurt griego sin azúcar (1/2taza) Proteina whey (1 servicio) Arandanos (1puño) Granola (2 cdas).
- Sandwich (pan 0 %azúcar) Jamón de pavo (3 rebanadas), Tomate, Aguacate, Lechuga, Queso cottage (2cdas). `,
    },
  ];

  const recomendaciones = {
    suplementos: [
      { name: "Bridman", url: "https://bridman.mx/" },
      { name: "RAW Nutrition", url: "https://getrawnutrition.com/" },
      { name: "Bum Energy", url: "https://bumenergy.com/" },
      { name: "Dragon Pharma", url: "https://dragonpharma.com/" },
      { name: "GNC", url: "https://www.gnc.com.mx/" },
      { name: "Omega 3", url: "https://solanum.com.mx/producto/2880/" },
      { name: "Probioticos 30 billones", url: "https://solanum.com.mx/producto/probioticos-30-billones-30-capsulas/" },
    ],
    estilo: [
      { name: "Gymshark", url: "https://row.gymshark.com/" },
      { name: "YoungLA", url: "https://www.youngla.com/" },
      { name: "Dfyne", url: "https://www.dfyne.com/" },
      { name: "Las mejores marcas con envios a todo México", url: "https://www.instagram.com/fit.active.slt/" },
    ],
    inspiracion: [
      { name: "Carlos Belcast", url: "https://www.youtube.com/@carlosbelcast" },
      { name: "Daddy Aoioli", url: "https://www.youtube.com/@DaddyAioli" },
      { name: "Esme Díaz", url: "https://www.youtube.com/@Esmediaz_" },
      { name: "LilBigNancy", url: "https://www.youtube.com/@lilbignanc" },
      { name: "LeanBeefPatty", url: "https://www.youtube.com/@theleanbeefpatty" },
      { name: "Diana Conforti", url: "https://www.youtube.com/@dianaconfortifit" },
      { name: "MadyFit", url: "https://www.instagram.com/madydaily/?hl=es-la" },
    ],
  };

  return (
    <div className="container-app py-8 space-y-12">
      {/* TIPS */}
      <section>
        <h1 className="text-3xl font-bold mb-6">Tips de Bienestar</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800"
            >
              <h2 className="font-semibold text-xl mb-2">{tip.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMENDACIONES */}
<section>
  <h1 className="text-3xl font-bold mb-6">Recomendaciones</h1>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {/* Suplementos */}
    <div className="reco-card p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
    <h2 className="text-xl font-semibold mb-4">💊 Suplementos</h2>
      <ul className="reco-list space-y-2">
        {recomendaciones.suplementos?.map((item, idx) => (
          <li key={`supp-${idx}`} className="reco-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Estilo (ropa / accesorios fitness) */}
    <div className="reco-card p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">🛍️ Estilo</h2>
      <ul className="reco-list space-y-2">
        {recomendaciones.estilo?.map((item, idx) => (
          <li key={`style-${idx}`} className="reco-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Inspiración (creadores, playlists, blogs, IG/TikTok, etc.) */}
    <div className="reco-card p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">✨ Inspiración</h2>
      <ul className="reco-list space-y-2">
        {recomendaciones.inspiracion?.map((item, idx) => (
          <li key={`insp-${idx}`} className="reco-item">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
</div > ); }
