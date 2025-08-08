import { useQuery } from 'react-query';
import axios from 'axios';
import { WeatherData } from '../types/weather';
import { API_KEY } from '../config';

export const useWeatherData = (lat?: number, lng?: number) => {
  return useQuery<WeatherData>(
    ['weather', lat, lng],
    async () => {
      if (!lat || !lng) throw new Error('Location not provided');
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat,
            lon: lng,
            units: 'metric',
            appid: API_KEY,
          },
        }
      );
      
      return response.data;
    },
    {
      enabled: !!lat && !!lng,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    }
  );
};
