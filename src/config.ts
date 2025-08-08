// OpenWeatherMap API Key
// Replace this with your actual API key from https://openweathermap.org/api
export const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

// Default map settings
export const DEFAULT_MAP_CENTER = [51.505, -0.09]; // London
export const DEFAULT_ZOOM_LEVEL = 10;

// App settings
export const APP_NAME = 'Weather Visualization';
export const DEFAULT_TEMPERATURE_UNIT = 'celsius'; // 'celsius' or 'fahrenheit'

// API endpoints
export const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const GEO_API_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Cache settings
export const CACHE_DURATION = {
  WEATHER: 5 * 60 * 1000, // 5 minutes
  FORECAST: 30 * 60 * 1000, // 30 minutes
  LOCATION: 24 * 60 * 60 * 1000, // 24 hours
};
