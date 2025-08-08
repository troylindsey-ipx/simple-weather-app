import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import HomePage from './pages/HomePage';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { getCurrentLocation } = useGeolocation();

  useEffect(() => {
    // Initialize the application
    const initApp = async () => {
      try {
        // Try to get user's location if they allow it
        await getCurrentLocation();
      } catch (error) {
        console.error('Error getting location:', error);
        // Continue even if location access is denied
      } finally {
        // Finish loading after a short delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    initApp();
  }, [getCurrentLocation]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
