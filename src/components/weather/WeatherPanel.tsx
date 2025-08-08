import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { useWeatherStore } from '../../store/weatherStore';
import { useWeatherData } from '../../hooks/useWeatherData';
import { useForecastData } from '../../hooks/useForecastData';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { useFavorites } from '../../hooks/useFavorites';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`weather-tabpanel-${index}`}
      aria-labelledby={`weather-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const WeatherPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const { selectedLocation, setSelectedLocation } = useWeatherStore();
  const { 
    data: weatherData, 
    isLoading: isLoadingWeather, 
    error: weatherError 
  } = useWeatherData(selectedLocation?.lat, selectedLocation?.lng);
  
  const { 
    data: forecastData, 
    isLoading: isLoadingForecast, 
    error: forecastError 
  } = useForecastData(selectedLocation?.lat, selectedLocation?.lng);

  const { 
    favorites, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useFavorites();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setSelectedLocation(null);
  };

  const handleToggleFavorite = () => {
    if (!weatherData) return;
    
    const locationData = {
      id: `${weatherData.coord.lat}-${weatherData.coord.lon}`,
      name: weatherData.name,
      lat: weatherData.coord.lat,
      lng: weatherData.coord.lon,
      country: weatherData.sys.country
    };
    
    if (isFavorite(locationData.id)) {
      removeFromFavorites(locationData.id);
    } else {
      addToFavorites(locationData);
    }
  };

  if (isLoadingWeather || isLoadingForecast) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (weatherError || forecastError) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">
            Error loading weather data. Please try again.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData || !forecastData) {
    return null;
  }

  const isFav = weatherData ? isFavorite(`${weatherData.coord.lat}-${weatherData.coord.lon}`) : false;

  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h2">
          {weatherData.name}, {weatherData.sys.country}
        </Typography>
        <Box>
          <IconButton 
            onClick={handleToggleFavorite}
            color={isFav ? "secondary" : "default"}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleClose} aria-label="Close panel">
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      
      <Divider />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="Weather information tabs"
          variant="fullWidth"
        >
          <Tab label="Current" id="weather-tab-0" aria-controls="weather-tabpanel-0" />
          <Tab label="Forecast" id="weather-tab-1" aria-controls="weather-tabpanel-1" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <CurrentWeather data={weatherData} />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <ForecastWeather data={forecastData} />
      </TabPanel>
    </Card>
  );
};

export default WeatherPanel;
