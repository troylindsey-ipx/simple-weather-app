import { Box, Typography, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ForecastData } from '../../types/weather';
import { getWeatherIconUrl } from '../../utils/weatherUtils';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastWeatherProps {
  data: ForecastData;
}

const ForecastWeather = ({ data }: ForecastWeatherProps) => {
  // Group forecast data by day
  const dailyForecasts = data.list.reduce((acc: any, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  // Get daily min/max temperatures and weather conditions
  const dailySummary = Object.keys(dailyForecasts).map(date => {
    const items = dailyForecasts[date];
    const temps = items.map((item: any) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get the most common weather condition for the day
    const weatherCounts: Record<string, number> = {};
    items.forEach((item: any) => {
      const weather = item.weather[0].main;
      weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
    });
    
    let mainWeather = '';
    let maxCount = 0;
    Object.entries(weatherCounts).forEach(([weather, count]) => {
      if (count > maxCount) {
        mainWeather = weather;
        maxCount = count as number;
      }
    });
    
    // Get icon from noon forecast if available, otherwise use first item
    const noonForecast = items.find((item: any) => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 11 && hour <= 13;
    }) || items[0];
    
    return {
      date: new Date(date),
      minTemp,
      maxTemp,
      weather: mainWeather,
      icon: noonForecast.weather[0].icon,
      description: noonForecast.weather[0].description,
    };
  });

  // Sort by date
  dailySummary.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Prepare data for temperature chart
  const chartData = {
    labels: dailySummary.map(day => day.date.toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Max Temperature',
        data: dailySummary.map(day => Math.round(day.maxTemp)),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Min Temperature',
        data: dailySummary.map(day => Math.round(day.minTemp)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '5-Day Temperature Forecast',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value: any) {
            return value + '°C';
          },
        },
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        5-Day Forecast
      </Typography>
      
      <Box sx={{ height: 200, mb: 3 }}>
        <Line data={chartData} options={chartOptions} />
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {dailySummary.map((day, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {Math.round(day.minTemp)}° / {Math.round(day.maxTemp)}°C
              </Typography>
              <img 
                src={getWeatherIconUrl(day.icon)} 
                alt={day.description} 
                style={{ width: 40, height: 40 }}
              />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {day.description}
          </Typography>
          {index < dailySummary.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default ForecastWeather;
