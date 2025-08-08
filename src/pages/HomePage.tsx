import { useState } from 'react';
import { Box } from '@mui/material';
import MapComponent from '../components/map/MapComponent';
import SearchBar from '../components/search/SearchBar';
import WeatherPanel from '../components/weather/WeatherPanel';
import { useWeatherStore } from '../store/weatherStore';
import { LatLngExpression } from 'leaflet';

const HomePage = () => {
  const { selectedLocation } = useWeatherStore();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.505, -0.09]); // Default to London

  const handleLocationSelect = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
  };

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <div className="search-container">
        <SearchBar onLocationSelect={handleLocationSelect} />
      </div>
      
      <div className="map-container">
        <MapComponent center={mapCenter} />
      </div>
      
      {selectedLocation && (
        <div className="weather-panel">
          <WeatherPanel />
        </div>
      )}
    </Box>
  );
};

export default HomePage;
