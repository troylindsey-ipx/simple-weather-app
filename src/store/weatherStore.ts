import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface WeatherState {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  temperatureUnit: 'celsius' | 'fahrenheit';
  setTemperatureUnit: (unit: 'celsius' | 'fahrenheit') => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      selectedLocation: null,
      setSelectedLocation: (location) => set({ selectedLocation: location }),
      temperatureUnit: 'celsius',
      setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
    }),
    {
      name: 'weather-store',
      getStorage: () => localStorage,
    }
  )
);
