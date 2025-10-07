import React from "react";

export default function Blog() {
  const tips = [
    {
      title: "La importancia de la hidratación",
      text: `El agua es esencial para el rendimiento físico y mental. Mantenerte hidratado ayuda a regular la temperatura corporal, mejorar la recuperación muscular y prevenir fatiga. 
      Un buen hábito es tomar entre 2–3 litros al día, dependiendo de tu nivel de actividad.`,
    },
    {
      title: "Dormir bien es progresar mejor",
      text: `El sueño profundo es el momento en que tu cuerpo se recupera y genera masa muscular. Dormir entre 7 y 9 horas de calidad reduce el estrés, mejora la energía y potencia tu rendimiento en el gym.`,
    },
    {
      title: "Probióticos: tu aliado digestivo",
      text: `Un sistema digestivo sano mejora la absorción de nutrientes. Consumir probióticos de 30 billones UFC, como kefir o búlgaros, fortalece la microbiota intestinal y ayuda a disminuir la inflamación.`,
    },
    {
      title: "Arroz Jazmín: energía rápida",
      text: `El arroz jazmín es un carbohidrato de fácil digestión, ideal como fuente de energía antes o después de entrenar. Su índice glucémico moderado lo hace perfecto para reponer glucógeno muscular.`,
    },
    {
      title: "Gelatina casera con grenetina y jamaica",
      text: `Evita edulcorantes, prepara gelatina casera con infusión de jamaica sin azúcar es una alternativa saludable y deliciosa para tus snacks. La grenetina aporta colágeno, que fortalece articulaciones, piel y cabello. `,
    },
  ];

  const recomendaciones = {
    suplementos: [
      { name: "Bridman", url: "https://bridman.mx/" },
      { name: "RAW Nutrition", url: "https://getrawnutrition.com/" },
      { name: "Bum Energy", url: "https://bumenergy.com/" },
      { name: "Dragon Pharma", url: "https://dragonpharma.com/" },
      { name: "GNC", url: "https://www.gnc.com.mx/" },
    ],
    ropa: [
      { name: "Gymshark", url: "https://row.gymshark.com/" },
      { name: "YoungLA", url: "https://www.youngla.com/" },
      { name: "Dfyne", url: "https://www.dfyne.com/" },
      { name: "Las mejores marcas con envios a todo México", url: "https://www.instagram.com/fit.active.slt/" },
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
        <div className="grid gap-8 md:grid-cols-2">
          {/* Suplementos */}
          <ul className="reco-list reco-list--supps list-disc list-inside space-y-2">
            {recomendaciones.suplementos.map((item, idx) => (
              <li key={idx}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="link">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Ropa Fitness */}
          <ul className="reco-list reco-list--apparel list-disc list-inside space-y-2">
            {recomendaciones.ropa.map((item, idx) => (
              <li key={idx}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="link">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section >
    </div >
  );
}
