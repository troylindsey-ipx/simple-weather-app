import { Box, Typography, Grid, Divider } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import { WeatherData } from '../../types/weather';
import { getWeatherIconUrl } from '../../utils/weatherUtils';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const iconUrl = getWeatherIconUrl(data.weather[0].icon);
  
  // Convert sunrise and sunset timestamps to readable time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img 
          src={iconUrl} 
          alt={data.weather[0].description} 
          style={{ width: 80, height: 80 }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h3" component="p">
            {Math.round(data.main.temp)}°C
          </Typography>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {data.weather[0].description}
          </Typography>
        </Box>
      </Box>
      
      <Typography variant="body2" sx={{ mb: 2 }}>
        Feels like {Math.round(data.main.feels_like)}°C. 
        {data.weather[0].description}.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThermostatIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Min/Max: {Math.round(data.main.temp_min)}°/{Math.round(data.main.temp_max)}°C
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OpacityIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Humidity: {data.main.humidity}%
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AirIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Wind: {Math.round(data.wind.speed * 3.6)} km/h
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CompressIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Pressure: {data.main.pressure} hPa
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Visibility: {(data.visibility / 1000).toFixed(1)} km
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WbSunnyIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Sunrise: {formatTime(data.sys.sunrise)}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WbTwilightIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Sunset: {formatTime(data.sys.sunset)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentWeather;
