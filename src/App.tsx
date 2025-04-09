import React, { useState, useCallback } from 'react';
import StoreInput from './components/StoreInput';
import RouteDisplay from './components/RouteDisplay';
import { findOptimalRoute } from './utils/routeCalculator';
import { RouteResult } from './types';
import { ShoppingCart } from 'lucide-react'; // Using ShoppingCart as a logo

function App() {
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateRoute = useCallback(async (storeNames: string[]) => {
    setIsLoading(true);
    setError(null);
    setRouteResult(null); // Clear previous results
    console.log("Calculating route for:", storeNames);
    try {
      const result = await findOptimalRoute(storeNames);
      if (result) {
        setRouteResult(result);
        console.log("Route calculation successful:", result);
      } else {
         setError("Could not find a valid route. Check if stores exist in mock data or if locations allow a path.");
         console.log("Route calculation returned null.");
      }
    } catch (err) {
      console.error("Route calculation failed:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during route calculation.');
    } finally {
      setIsLoading(false);
      console.log("Finished calculation attempt.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
           <div className="flex justify-center items-center mb-4">
             <ShoppingCart size={48} className="text-blue-600" />
           </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manhattan Store Hop</h1>
          <p className="text-lg text-gray-600">Find the shortest walking route between your favorite stores.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <StoreInput onCalculateRoute={handleCalculateRoute} isLoading={isLoading} />
          </div>
          <div className="md:mt-0">
             {/* Display loading state overlay or within RouteDisplay */}
             {isLoading && !error && !routeResult && (
                <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center h-48">
                    <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="ml-3 text-gray-600">Finding the best route...</span>
                </div>
             )}
             {/* Display results or error only when not in initial loading state */}
             {(!isLoading || error || routeResult) && (
                <RouteDisplay routeResult={routeResult} error={error} />
             )}
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Distances are estimates based on mock data. Map is a placeholder.</p>
          <p>Built with React, TailwindCSS, and Mock Data.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
