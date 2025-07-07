// src/pages/CountryDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchByCode } from '../services/api';

function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await fetchByCode(code);
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
      } catch (err) {
        setError('Failed to fetch country details');
      } finally {
        setLoading(false);
      }
    };
    loadCountry();
  }, [code]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-red-600">{error}</h3>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to all countries
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to all countries
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {country.name.common}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold">Official Name:</p>
                <p>{country.name.official}</p>
              </div>
              
              <div>
                <p className="font-semibold">Capital:</p>
                <p>{country.capital?.[0] || 'N/A'}</p>
              </div>
              
              <div>
                <p className="font-semibold">Region:</p>
                <p>{country.region}</p>
              </div>
              
              <div>
                <p className="font-semibold">Population:</p>
                <p>{country.population.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="font-semibold">Languages:</p>
                <p>
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
                </p>
              </div>
              
              <div>
                <p className="font-semibold">Area:</p>
                <p>{country.area?.toLocaleString() || 'N/A'} km²</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;