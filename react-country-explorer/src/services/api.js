// src/services/api.js
import axios from 'axios';

const API_BASE = 'https://restcountries.com/v3.1';

const fields = 'name,capital,region,population,languages,flags,cca3';

export const fetchAllCountries = async () => {
  const response = await axios.get(`${API_BASE}/all?fields=${fields}`);
  return response.data;
};

export const fetchByCode = async (code) => {
  const response = await axios.get(`${API_BASE}/alpha/${code}`);
  return response.data;
};