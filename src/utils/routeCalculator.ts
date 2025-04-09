import { Location, RouteResult } from '../types';
import { fetchMockLocations, getMockDistance } from '../data/mockData';

// Helper function to generate all permutations of an array
function permute<T>(arr: T[]): T[][] {
  if (arr.length === 0) return [[]];
  const first = arr[0];
  const rest = arr.slice(1);
  const permsWithoutFirst = permute(rest);
  const allPermutations: T[][] = [];
  permsWithoutFirst.forEach(perm => {
    for (let i = 0; i <= perm.length; i++) {
      const permWithFirst = [...perm.slice(0, i), first, ...perm.slice(i)];
      allPermutations.push(permWithFirst);
    }
  });
  return allPermutations;
}

// Calculates the total distance for a given sequence of locations
function calculateRouteDistance(route: Location[]): number {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const dist = getMockDistance(route[i].id, route[i + 1].id);
    if (dist === Infinity) return Infinity; // Invalid route if distance is unknown
    totalDistance += dist;
  }
  return totalDistance;
}

// Finds the optimal route among all combinations of store locations
export const findOptimalRoute = async (storeNames: string[]): Promise<RouteResult | null> => {
  if (storeNames.length < 2) {
    console.log("Need at least two stores to calculate a route.");
    return null; // Need at least two stores
  }

  console.log("Fetching locations for stores:", storeNames);
  // 1. Fetch all possible locations for each store name
  const locationsPerStore: Location[][] = [];
  for (const name of storeNames) {
    try {
      const locations = await fetchMockLocations(name);
      if (locations.length === 0) {
        console.warn(`No locations found for ${name}, skipping store.`);
        // Optionally throw an error or handle differently
        // For now, we just skip this store if no locations are found
        continue;
      }
      locationsPerStore.push(locations);
    } catch (error) {
      console.error(`Error fetching locations for ${name}:`, error);
      throw new Error(`Failed to fetch locations for ${name}.`); // Re-throw to signal failure
    }
  }

  // Adjust storeNames to match the stores we actually found locations for
  const validStoreNames = storeNames.filter((_, index) => locationsPerStore[index] && locationsPerStore[index].length > 0);
  if (locationsPerStore.length < 2) {
     console.log("Need at least two valid stores with locations to calculate a route.");
     return null;
  }


  console.log("Generating location combinations...");
  // 2. Generate all combinations (one location per store)
  const generateCombinations = (arrays: Location[][]): Location[][] => {
    if (arrays.length === 0) return [[]];
    const firstArray = arrays[0];
    const restCombinations = generateCombinations(arrays.slice(1));
    const combinations: Location[][] = [];
    firstArray.forEach(item => {
      restCombinations.forEach(combo => {
        combinations.push([item, ...combo]);
      });
    });
    return combinations;
  };

  const locationCombinations = generateCombinations(locationsPerStore);
  console.log(`Generated ${locationCombinations.length} location combinations.`);

  let bestRoute: Location[] | null = null;
  let minDistance = Infinity;

  console.log("Calculating distances for all permutations of combinations...");
  // 3. For each combination, find the shortest path (permutation)
  locationCombinations.forEach(combination => {
    const permutations = permute(combination);
    permutations.forEach(routeOrder => {
      const currentDistance = calculateRouteDistance(routeOrder);
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        bestRoute = routeOrder;
      }
    });
  });

  if (!bestRoute || minDistance === Infinity) {
    console.log("Could not find a valid route.");
    return null;
  }

  console.log("Optimal route found:", bestRoute, "Distance:", minDistance);
  return {
    stores: bestRoute,
    totalDistance: minDistance,
    orderedAddresses: bestRoute.map(loc => `${loc.name} - ${loc.address}`),
  };
};
