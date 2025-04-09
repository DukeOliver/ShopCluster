import React from 'react';
import { RouteResult } from '../types';
import { MapPin, Footprints } from 'lucide-react';

interface RouteDisplayProps {
  routeResult: RouteResult | null;
  error: string | null;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ routeResult, error }) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!routeResult) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center">
        Enter store names above and click "Calculate" to see the optimal route.
      </div>
    );
  }

  const totalDistanceKm = (routeResult.totalDistance / 1000).toFixed(2);
  const estimatedTimeMinutes = Math.round(routeResult.totalDistance / 80); // Avg walking speed 80m/min

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Optimal Route</h2>

      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
         <div className="flex items-center text-green-800 mb-2">
             <Footprints size={20} className="mr-2" />
             <span className="font-semibold">Total Walking Distance:</span>
             <span className="ml-2">{totalDistanceKm} km</span>
         </div>
         <div className="flex items-center text-green-700 text-sm">
             <span className="font-semibold">Estimated Time:</span>
             <span className="ml-2">~{estimatedTimeMinutes} minutes</span>
         </div>
      </div>


      <h3 className="text-lg font-medium mb-3 text-gray-600">Stop Order:</h3>
      <ol className="list-decimal list-inside space-y-3">
        {routeResult.orderedAddresses.map((address, index) => (
          <li key={index} className="flex items-start">
            <MapPin size={18} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
            <span className="text-gray-800">{address}</span>
          </li>
        ))}
      </ol>

      {/* Placeholder for Map */}
      <div className="mt-6 bg-gray-200 h-64 rounded-md flex items-center justify-center text-gray-500">
        Map Placeholder
        {/* In a real app, integrate Google Maps Embed API or Leaflet here */}
        {/* Example: <iframe src={`google-maps-embed-url-with-waypoints`} width="100%" height="100%"></iframe> */}
      </div>
    </div>
  );
};

export default RouteDisplay;
