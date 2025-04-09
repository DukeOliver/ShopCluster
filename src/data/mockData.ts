import { StoreLocations, DistanceMatrix, Location } from '../types';

// Mock store locations in Manhattan
export const mockStoreLocations: StoreLocations = {
  "Zara": [
    { id: "zara1", name: "Zara", address: "666 5th Ave, New York, NY 10103", lat: 40.7598, lng: -73.9788 },
    { id: "zara2", name: "Zara", address: "101 5th Ave, New York, NY 10003", lat: 40.7379, lng: -73.9921 },
    { id: "zara3", name: "Zara", address: "500 5th Ave, New York, NY 10110", lat: 40.7548, lng: -73.9821 },
  ],
  "Trader Joe's": [
    { id: "tj1", name: "Trader Joe's", address: "675 6th Ave, New York, NY 10010", lat: 40.7417, lng: -73.9948 },
    { id: "tj2", name: "Trader Joe's", address: "207 E 32nd St, New York, NY 10016", lat: 40.7448, lng: -73.9799 },
    { id: "tj3", name: "Trader Joe's", address: "400 Grand St, New York, NY 10002", lat: 40.7161, lng: -73.9840 },
  ],
  "Muji": [
    { id: "muji1", name: "Muji", address: "475 5th Ave, New York, NY 10017", lat: 40.7531, lng: -73.9817 },
    { id: "muji2", name: "Muji", address: "16 W 19th St, New York, NY 10011", lat: 40.7394, lng: -73.9929 },
    { id: "muji3", name: "Muji", address: "455 Broadway, New York, NY 10013", lat: 40.7205, lng: -74.0001 },
  ],
  "Apple Store": [
     { id: "apple1", name: "Apple Store", address: "767 5th Ave, New York, NY 10153", lat: 40.7639, lng: -73.9729 }, // 5th Ave
     { id: "apple2", name: "Apple Store", address: "401 W 14th St, New York, NY 10014", lat: 40.7407, lng: -74.0050 }, // West 14th
     { id: "apple3", name: "Apple Store", address: "103 Prince St, New York, NY 10012", lat: 40.7243, lng: -73.9992 }, // SoHo
  ]
};

// Mock distance matrix (simplified, not geographically accurate, distances in meters)
// In a real app, this would come from Google Distance Matrix API
export const mockDistanceMatrix: DistanceMatrix = {
  // Zara locations
  "zara1": { "zara2": 2400, "zara3": 600, "tj1": 2200, "tj2": 1800, "tj3": 5000, "muji1": 800, "muji2": 2300, "muji3": 4000, "apple1": 650, "apple2": 3500, "apple3": 4200 },
  "zara2": { "zara1": 2400, "zara3": 2000, "tj1": 450, "tj2": 1500, "tj3": 2800, "muji1": 1900, "muji2": 150, "muji3": 1800, "apple1": 3000, "apple2": 1200, "apple3": 1600 },
  "zara3": { "zara1": 600, "zara2": 2000, "tj1": 1700, "tj2": 1300, "tj3": 4500, "muji1": 250, "muji2": 1800, "muji3": 3500, "apple1": 1200, "apple2": 3000, "apple3": 3700 },
  // Trader Joe's locations
  "tj1": { "zara1": 2200, "zara2": 450, "zara3": 1700, "tj2": 1100, "tj3": 3000, "muji1": 1500, "muji2": 350, "muji3": 2000, "apple1": 2800, "apple2": 800, "apple3": 1800 },
  "tj2": { "zara1": 1800, "zara2": 1500, "zara3": 1300, "tj1": 1100, "tj3": 3500, "muji1": 1000, "muji2": 1400, "muji3": 3000, "apple1": 2400, "apple2": 2200, "apple3": 2800 },
  "tj3": { "zara1": 5000, "zara2": 2800, "zara3": 4500, "tj1": 3000, "tj2": 3500, "muji1": 4300, "muji2": 2900, "muji3": 1000, "apple1": 5500, "apple2": 2500, "apple3": 800 },
  // Muji locations
  "muji1": { "zara1": 800, "zara2": 1900, "zara3": 250, "tj1": 1500, "tj2": 1000, "tj3": 4300, "muji2": 1700, "muji3": 3300, "apple1": 1400, "apple2": 2800, "apple3": 3500 },
  "muji2": { "zara1": 2300, "zara2": 150, "zara3": 1800, "tj1": 350, "tj2": 1400, "tj3": 2900, "muji1": 1700, "muji3": 1900, "apple1": 3000, "apple2": 1000, "apple3": 1700 },
  "muji3": { "zara1": 4000, "zara2": 1800, "zara3": 3500, "tj1": 2000, "tj2": 3000, "tj3": 1000, "muji1": 3300, "muji2": 1900, "apple1": 4500, "apple2": 1500, "apple3": 200 },
   // Apple Store locations
  "apple1": { "zara1": 650, "zara2": 3000, "zara3": 1200, "tj1": 2800, "tj2": 2400, "tj3": 5500, "muji1": 1400, "muji2": 3000, "muji3": 4500, "apple2": 4000, "apple3": 4800 },
  "apple2": { "zara1": 3500, "zara2": 1200, "zara3": 3000, "tj1": 800, "tj2": 2200, "tj3": 2500, "muji1": 2800, "muji2": 1000, "muji3": 1500, "apple1": 4000, "apple3": 1300 },
  "apple3": { "zara1": 4200, "zara2": 1600, "zara3": 3700, "tj1": 1800, "tj2": 2800, "tj3": 800, "muji1": 3500, "muji2": 1700, "muji3": 200, "apple1": 4800, "apple2": 1300 },
};

// Helper to get distance between two location IDs from the mock matrix
export const getMockDistance = (locId1: string, locId2: string): number => {
  if (locId1 === locId2) return 0;
  return mockDistanceMatrix[locId1]?.[locId2] ?? mockDistanceMatrix[locId2]?.[locId1] ?? Infinity;
};

// Mock API fetch function
export const fetchMockLocations = async (storeName: string): Promise<Location[]> => {
  console.log(`Fetching mock locations for: ${storeName}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));
  const locations = mockStoreLocations[storeName];
  if (!locations) {
    console.warn(`No mock locations found for ${storeName}`);
    return [];
    // throw new Error(`No locations found for ${storeName}`);
  }
  console.log(`Found ${locations.length} mock locations for ${storeName}`);
  return locations;
};
