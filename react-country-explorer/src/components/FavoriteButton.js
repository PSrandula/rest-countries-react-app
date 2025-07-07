// src/components/FavoriteButton.js
import React, { useContext } from 'react';
import { useCountryContext } from '../context/CountryContext';

function FavoriteButton({ country, className }) {
  const { favorites, toggleFavorite } = useCountryContext();
  const isFavorite = favorites.some(fav => fav.cca3 === country.cca3);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(country);
      }}
      className={`p-2 rounded-full bg-white bg-opacity-80 ${
        isFavorite 
          ? 'text-red-500 hover:text-red-700' 
          : 'text-gray-400 hover:text-gray-600'
      } transition-colors ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill={isFavorite ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}

export default FavoriteButton;