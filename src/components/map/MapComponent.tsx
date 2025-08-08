import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { Box } from '@mui/material';
import { useWeatherStore } from '../../store/weatherStore';
import { useWeatherData } from '../../hooks/useWeatherData';

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapComponentProps {
  center: LatLngExpression;
}

// This component handles map center updates
const MapController = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
};

const MapComponent = ({ center }: MapComponentProps) => {
  const { selectedLocation, setSelectedLocation } = useWeatherStore();
  const { data: weatherData } = useWeatherData(
    selectedLocation?.lat,
    selectedLocation?.lng
  );

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({
      lat,
      lng,
      name: 'Selected Location', // This will be updated when weather data is fetched
    });
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={center} />
        
        {selectedLocation && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lng]} 
            icon={customIcon}
          >
            <Popup>
              {weatherData ? (
                <>
                  <strong>{weatherData.name}</strong>
                  <p>{weatherData.weather[0].description}</p>
                  <p>{Math.round(weatherData.main.temp)}°C</p>
                </>
              ) : (
                'Loading weather data...'
              )}
            </Popup>
          </Marker>
        )}
        
        {/* This will be replaced with weather overlay layers in future implementation */}
        
        {/* Event handler for map clicks */}
        <div 
          onClick={handleMapClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 400,
            pointerEvents: 'auto',
          }}
        />
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
