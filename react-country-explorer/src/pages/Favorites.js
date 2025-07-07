// src/pages/Favorites.js
import React, { useContext } from 'react';
import { useCountryContext } from '../context/CountryContext';
import CountryCard from '../components/CountryCard';

function Favorites() {
  const { favorites } = useCountryContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-blue-800">⭐ Favorite Countries</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No favorites yet</h3>
          <p className="text-gray-500 mt-2">Add countries to your favorites by clicking the heart icon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;