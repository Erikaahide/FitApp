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
        "Yogurt griego sin azúcar",
        "Jamón de pechuga de pavo",
        "Queso cottage bajo en grasa",
      ],
    },
    {
      key: 'hidratos',
      label: 'Hidratos de carbono',
      items: [
        'Tortilla ligeras',
        'Pasta Integral',
        'Crema de arroz',
        'Rice cakes',
        'Chayote',
        'Coliflor',
      ],
    },
    {
      key: 'lipidos',
      label: 'Lípidos',
      items: [
          'Mantequilla pura de vaca',
          'Aguacate',
          'Frijoles',
      ],
    },
    {
      key: 'verduras',
      label: 'Verduras libres (sin cantidad)',
      items: [
        'Ejotes', 'Nopales', 'Espinacas', 'Brócoli',
        'Espárragos', 'Champiñones', 'Lechuga',
        'Cebolla', 'Jitomate', 'Pimiento morrón',
      ],
    },
    {
      key: 'frutas',
      label: 'Frutas',
      items: [
        'Manzana', 'Fresas', 'Arandanos', 'Mandarina', 'Naranja',
        'Guayaba', 'Uvas', 'Papaya', 'Sandía',
      ],
    },
    {
      key: 'grasas-prot',
      label: 'Grasas con proteína',
      items: [
        'Almendras', 'Cacahuates', 'Nueces enteras',
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
  export const CUT_LIST = SHOPPING_DATA;

  