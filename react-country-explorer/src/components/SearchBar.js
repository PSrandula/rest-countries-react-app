// src/components/SearchBar.js
import React, { useState, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar({ onSearch, loading }) {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef(null);
  
  // Debounce implementation
  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (inputValue.trim() !== '') {
      timeoutRef.current = setTimeout(() => {
        onSearch(inputValue);
      }, 500);
    } else {
      onSearch('');
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, onSearch]);

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400 text-xl" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search countries by name..."
          className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
          aria-label="Search countries"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <FiX className="text-xl" />
          </button>
        )}
      </div>
      
      {loading && (
        <div className="absolute top-3 right-3">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {inputValue && !loading && (
        <p className="text-sm text-gray-500 mt-1 ml-1">
          Showing results for: <span className="font-medium">{inputValue}</span>
        </p>
      )}
    </div>
  );
}

export default SearchBar;