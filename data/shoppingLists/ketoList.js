// Utilidad para IDs estables
const slug = (s) =>
    s.toLowerCase()
     .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
     .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  export const SHOPPING_CATEGORIES = [
    {
      key: 'proteinas',
      label: 'Proteínas',
      items: [
        'Huevo',
        'Clara de huevo',
        'Salmón',
        'Atún',
        'Pescado blanco',
        'Milanesa de res',
        'Pechuga de pollo',
        'Filete de pescado',
      ],
    },

    {
      key: 'verduras',
      label: 'Verduras bajas en carbohidratos (controladas)',
      items: [
        "Espinacas",
        "Lechuga",
        "Brócoli",
        "Coliflor",
        "Ejotes",
        "Nopales",
        "Chayote",
        "Pepino",
        "Cebolla",
        "Jitomate",
        "Espárragos",
        "Champiñones",
        "Pimiento morrón",
        "Calabaza italiana",
      ],
    },
    {
      key: 'frutas',
      label: "Frutas keto (porciones pequeñas)",
      items: [
        "Fresas",
        "Arándanos",
        "Frambuesas",
        "Moras",
        "Limón",
        "Guayaba"
      ],
    },
    {
      key: 'grasas-prot',
      label: 'Grasas saludables',
      items: [
        "Aceite de oliva extra virgen",
        "Aceite de coco",
        "Semillas de chía",
        "Semillas de linaza",
        "Semillas de girasol",
        'Aguacate',
        "Almendras",
        "Nueces enteras",
        "Cacahuates naturales",
        "Cremas keto (almendra o cacahuate sin azúcar)"
      ],
    },
    {
      key: 'snacks',
      label: 'Snacks extra',
      items: [
        'Gelatina light', 'Café negro', 'Monk fruit',
      ],
    },
  ];
  
  // Estructura normalizada con IDs únicos por (categoría + nombre)
  export const SHOPPING_DATA = SHOPPING_CATEGORIES.map(cat => ({
    ...cat,
    items: Array.from(new Set(cat.items)).map(name => ({
      id: `${cat.key}:${slug(name)}`,
      name,
    })),
  }));
  
  export const ALL_ITEMS = SHOPPING_DATA.flatMap(c => c.items);
  export const KETO_LIST = SHOPPING_DATA;

  