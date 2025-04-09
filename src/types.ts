export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface StoreLocations {
  [storeName: string]: Location[];
}

export interface DistanceMatrix {
  [locationId1: string]: {
    [locationId2: string]: number; // walking distance in meters
  };
}

export interface RouteResult {
  stores: Location[];
  totalDistance: number; // in meters
  orderedAddresses: string[];
}
