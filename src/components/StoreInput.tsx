import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface StoreInputProps {
  initialStores?: string[];
  onCalculateRoute: (storeNames: string[]) => void;
  isLoading: boolean;
}

const StoreInput: React.FC<StoreInputProps> = ({
  initialStores = ["Zara", "Trader Joe's", "Muji"],
  onCalculateRoute,
  isLoading
}) => {
  const [stores, setStores] = useState<string[]>(initialStores);
  const [newStore, setNewStore] = useState<string>('');

  const handleAddStore = () => {
    if (newStore.trim() && !stores.includes(newStore.trim())) {
      setStores([...stores, newStore.trim()]);
      setNewStore('');
    }
  };

  const handleRemoveStore = (storeToRemove: string) => {
    setStores(stores.filter(store => store !== storeToRemove));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStore(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddStore();
    }
  };

  const handleCalculateClick = () => {
    if (stores.length >= 2) {
      onCalculateRoute(stores);
    } else {
      alert("Please add at least two stores to calculate a route.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Enter Store Names</h2>
      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          value={newStore}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Apple Store"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddStore}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 flex items-center justify-center"
          aria-label="Add store"
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className="mb-4 space-y-2">
        {stores.map((store, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
            <span className="text-gray-800">{store}</span>
            <button
              onClick={() => handleRemoveStore(store)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${store}`}
            >
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCalculateClick}
        disabled={isLoading || stores.length < 2}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-150 flex items-center justify-center gap-2 ${
          isLoading || stores.length < 2
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating...
          </>
        ) : (
          'Calculate Optimal Route'
        )}
      </button>
    </div>
  );
};

export default StoreInput;
