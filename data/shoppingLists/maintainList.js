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
        "Huevo",
        "Clara de huevo",
        "Atún",
        "Salmón",
        "Pechuga de pollo",
        "Milanesa de res",
        "Filete de pescado blanco",
        "Jamón de pechuga de pavo",
        "Queso panela",
        "Queso Oaxaca",
        "Yogurt griego sin azúcar",
        "Queso cottage bajo en grasa",
      ],
    },
    {
      key: 'hidratos',
      label: 'Hidratos de carbono',
      items: [
        "Arroz",
        "Pasta integral",
        "Tortilla de maíz",
        "Crema de arroz",
        "Avena",
        "Papa cocida",
        "Camote cocido",
        "Coliflor",
        "Calabaza italiana",
        "Chayote",
      ],
    },
    {
      key: 'lipidos',
      label: 'Lípidos',
      items: [
        'Aguacate',
        'Mantequilla pura de vaca',
        'Crema ácida',
        "Leche light",
      ],
    },
    {
      key: 'verduras',
      label: 'Verduras libres (sin cantidad)',
      items: [
        'Ejotes', 'Nopales', 'Espinacas', 'Acelgas', 'Coliflor', 'Brócoli',
        'Zanahoria', 'Chayote', 'Espárragos', 'Champiñones', 'Lechuga',
        'Cebolla', 'Jitomate', 'Pimiento morrón',
      ],
    },
    {
      key: 'frutas',
      label: 'Frutas',
      items: [
        'Plátano', 'Manzana', 'Fresas', 'Arandanos', 'Mandarina', 'Naranja',
        'Guayaba', 'Uvas', 'Papaya', 'Melón', 'Sandía', 'Piña',
      ],
    },
    {
      key: 'grasas-prot',
      label: 'Grasas con proteína',
      items: [
        'Almendras', 'Cacahuates', 'Nueces enteras',
        'Semillas de chía',
        'Semillas de linaza',
        'Crema de cacahuate sin azúcar','Crema de almendra sin azúcar',
      ],
    },
    {
      key: 'snacks',
      label: 'Snacks extra',
      items: [
        'Gelatina light', 'Chicles sin azúcar', 'Té verde',
        'Café negro', 'Leche light','Stevia', 'Matcha', 'Snacks sin azúcar', 'Refresco sin azúcar ni calorías'
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
  export const MAINTAIN_LIST = SHOPPING_DATA;

  