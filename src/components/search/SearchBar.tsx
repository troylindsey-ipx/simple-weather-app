import { useState } from 'react';
import { 
  TextField, 
  Autocomplete, 
  CircularProgress, 
  Paper,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchLocations } from '../../hooks/useSearchLocations';
import { useWeatherStore } from '../../store/weatherStore';

interface SearchBarProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

interface LocationOption {
  name: string;
  lat: number;
  lng: number;
  country: string;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { setSelectedLocation } = useWeatherStore();
  
  const { 
    data: locations, 
    isLoading, 
    error 
  } = useSearchLocations(searchQuery);

  const handleLocationSelect = (_: any, option: LocationOption | null) => {
    if (option) {
      setSelectedLocation({
        lat: option.lat,
        lng: option.lng,
        name: option.name
      });
      onLocationSelect(option.lat, option.lng);
    }
  };

  return (
    <Autocomplete
      id="location-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => 
        option.lat === value.lat && option.lng === value.lng
      }
      getOptionLabel={(option) => 
        `${option.name}${option.country ? `, ${option.country}` : ''}`
      }
      options={locations || []}
      loading={isLoading}
      onChange={handleLocationSelect}
      onInputChange={(_, value) => setSearchQuery(value)}
      noOptionsText={error ? "Error loading locations" : "No locations found"}
      PaperComponent={(props) => <Paper elevation={3} {...props} />}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search locations"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
