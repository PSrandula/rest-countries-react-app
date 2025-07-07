// src/components/CountryCard.js
import React from 'react';
import FavoriteButton from './FavoriteButton';
import { Link } from 'react-router-dom';

function CountryCard({ country }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/country/${country.cca3}`} className="block">
        <div className="w-full h-48 overflow-hidden">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
          <div className="space-y-1">
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </Link>
      <FavoriteButton country={country} className="absolute top-2 right-2" />
    </div>
  );
}

export default CountryCard;