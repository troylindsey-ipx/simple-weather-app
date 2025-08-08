import { useQuery } from 'react-query';
import axios from 'axios';
import { API_KEY } from '../config';

interface GeocodingResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const useSearchLocations = (query: string) => {
  return useQuery<Array<{ name: string; lat: number; lng: number; country: string }>>(
    ['geocoding', query],
    async () => {
      if (!query || query.length < 3) return [];
      
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: query,
            limit: 5,
            appid: API_KEY,
          },
        }
      );
      
      return response.data.map((item: GeocodingResult) => ({
        name: item.name,
        lat: item.lat,
        lng: item.lon,
        country: item.country,
      }));
    },
    {
      enabled: query.length >= 3,
      staleTime: 60 * 60 * 1000, // 1 hour
      retry: 1,
    }
  );
};
