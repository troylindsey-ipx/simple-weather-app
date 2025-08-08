import { useState, useEffect } from 'react';

interface FavoriteLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('weather-favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        // Reset favorites if there's an error
        localStorage.removeItem('weather-favorites');
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (location: FavoriteLocation) => {
    setFavorites((prev) => {
      // Check if location already exists
      if (prev.some((item) => item.id === location.id)) {
        return prev;
      }
      return [...prev, location];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
