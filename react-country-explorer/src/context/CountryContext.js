// src/context/CountryContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAllCountries } from '../services/api';

const CountryContext = createContext();

export const useCountryContext = () => useContext(CountryContext);

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteCountries');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);

  // Fetch all countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFiltered(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...countries];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(term) || 
        (c.name.official && c.name.official.toLowerCase().includes(term)))
    }
    
    if (region) {
      result = result.filter(c => c.region === region);
    }
    
    if (language) {
      result = result.filter(c => 
        c.languages && 
        Object.values(c.languages).some(lang => 
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    }
    
    setFiltered(result);
  }, [searchTerm, region, language, countries]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteCountries', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (country) => {
    setFavorites(prev => 
      prev.some(fav => fav.cca3 === country.cca3)
        ? prev.filter(fav => fav.cca3 !== country.cca3)
        : [...prev, country]
    );
  };

  // Get unique regions
  const regions = [...new Set(countries.map(c => c.region))].filter(Boolean).sort();
  
  // Get unique languages
  const languages = countries.reduce((acc, country) => {
    if (country.languages) {
      Object.values(country.languages).forEach(lang => {
        if (!acc.includes(lang)) acc.push(lang);
      });
    }
    return acc;
  }, []).sort();

  const value = {
    countries,
    filtered,
    loading,
    searchTerm,
    setSearchTerm,
    region,
    setRegion,
    language,
    setLanguage,
    favorites,
    toggleFavorite,
    regions,
    languages
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};