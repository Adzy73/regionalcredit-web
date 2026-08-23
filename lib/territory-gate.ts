import postcodeGateData from '../data/postcode-gate.json';
import eligibleTownsData from '../data/eligible-towns.json';

export interface TerritoryValidationResult {
  postcode: string;
  action: 'allow' | 'deny' | 'geocode_address';
  reason: string;
  eligibleTowns?: string[];
  ineligibleTowns?: string[];
  localities?: string[];
  kmFromGpoMin?: number;
  kmToStoreMin?: number;
}

export function validateTerritory(postcode: string): TerritoryValidationResult {
  const cleanPc = postcode.trim();
  const pcData = (postcodeGateData.postcodes as Record<string, any>)[cleanPc];

  if (!pcData) {
    // Default-deny for unknown or out-of-state postcodes
    return {
      postcode: cleanPc,
      action: 'deny',
      reason: 'out_of_service_area',
    };
  }

  return {
    postcode: cleanPc,
    action: pcData.action as 'allow' | 'deny' | 'geocode_address',
    reason: pcData.reason || '',
    localities: pcData.localities || [],
    kmFromGpoMin: pcData.km_from_gpo_min,
    kmToStoreMin: pcData.km_to_store_min,
  };
}

export function getEligibleTownsList() {
  return (eligibleTownsData.towns as Array<any>)
    .filter((t) => t.eligible)
    .map((t) => ({
      town: t.town,
      parentTown: t.parent_town,
      population: t.population,
      postcodes: t.postcodes,
      kmFromGpo: t.km_from_adelaide_gpo,
    }));
}
