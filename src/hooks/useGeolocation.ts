import { useState, useCallback } from 'react';
import { useWeatherStore } from '../store/weatherStore';

export const useGeolocation = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedLocation } = useWeatherStore();

  const getCurrentLocation = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geolocation is not supported by your browser';
        setError(error);
        reject(new Error(error));
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          setSelectedLocation({
            lat: latitude,
            lng: longitude,
            name: 'Current Location', // This will be updated when weather data is fetched
          });
          
          setIsLoading(false);
          resolve(position);
        },
        (error) => {
          let errorMessage = 'Unknown error';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'User denied the request for geolocation';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'The request to get user location timed out';
              break;
          }
          
          setError(errorMessage);
          setIsLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }, [setSelectedLocation]);

  return {
    getCurrentLocation,
    error,
    isLoading,
  };
};
