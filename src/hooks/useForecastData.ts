import { useQuery } from 'react-query';
import axios from 'axios';
import { ForecastData } from '../types/weather';
import { API_KEY } from '../config';

export const useForecastData = (lat?: number, lng?: number) => {
  return useQuery<ForecastData>(
    ['forecast', lat, lng],
    async () => {
      if (!lat || !lng) throw new Error('Location not provided');
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
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
      staleTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
    }
  );
};
