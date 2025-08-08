/**
 * Get the URL for a weather icon based on the icon code
 * @param iconCode The icon code from OpenWeatherMap API
 * @returns The URL to the weather icon
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Convert temperature from Celsius to Fahrenheit
 * @param celsius Temperature in Celsius
 * @returns Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Convert temperature from Fahrenheit to Celsius
 * @param fahrenheit Temperature in Fahrenheit
 * @returns Temperature in Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

/**
 * Get a weather tip based on current weather conditions
 * @param weatherId The weather condition ID from OpenWeatherMap API
 * @param temp The current temperature in Celsius
 * @returns A weather tip
 */
export const getWeatherTip = (weatherId: number, temp: number): string => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'Thunderstorms in the area. Stay indoors and avoid open areas.';
  }
  
  // Drizzle or Rain
  if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return 'Don\'t forget your umbrella today!';
  }
  
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return 'Snowy conditions. Drive carefully and dress warmly.';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return 'Reduced visibility. Take care when driving.';
  }
  
  // Clear sky
  if (weatherId === 800) {
    if (temp > 30) {
      return 'It\'s hot out there! Stay hydrated and use sunscreen.';
    } else if (temp > 20) {
      return 'Beautiful day! Perfect for outdoor activities.';
    } else if (temp > 10) {
      return 'Pleasant weather. A light jacket might be comfortable.';
    } else {
      return 'Clear but cold. Bundle up before heading out!';
    }
  }
  
  // Clouds
  if (weatherId > 800) {
    return 'Cloudy conditions today. You might want to have a jacket handy.';
  }
  
  return 'Check the forecast for your planned activities today.';
};

/**
 * Format wind direction in degrees to cardinal direction
 * @param degrees Wind direction in degrees
 * @returns Cardinal direction (N, NE, E, etc.)
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};
