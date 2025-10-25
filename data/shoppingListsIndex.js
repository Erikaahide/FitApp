// === Importa las 4 listas ===
import { BULK_LIST } from './shoppingLists/bulkList';
import { MAINTAIN_LIST } from './shoppingLists/maintainList';
import { CUT_LIST } from './shoppingLists/cutList';
import { KETO_LIST } from './shoppingLists/ketoList';

// === Exporta un objeto centralizado ===
// Esto permite acceder a la lista correcta con SHOPPING_PLANS[plan]
export const SHOPPING_PLANS = {
  bulk: BULK_LIST,
  maintain: MAINTAIN_LIST,
  cut: CUT_LIST,
  keto: KETO_LIST,
};
