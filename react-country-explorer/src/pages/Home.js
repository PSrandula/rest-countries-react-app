// src/pages/Home.js
import React, { useContext } from 'react';
import { useCountryContext } from '../context/CountryContext';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import CountryCard from '../components/CountryCard';

function Home() {
  const { filtered, loading, setSearchTerm } = useCountryContext();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800">
        🌍 World Explorer
      </h1>

      <div className="mb-8">
        <SearchBar onSearch={setSearchTerm} loading={loading} />
        <Filters />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600">No countries found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;