import { Selector } from "reactive-data-source";

import { abilitiesCollectionWithExtraData } from "src/data-layer/services";

export const dashboardAbilities = new Selector(
  abilitiesCollectionWithExtraData,
  abilitiesResults => abilitiesResults.slice(0, 6),
  []
);
