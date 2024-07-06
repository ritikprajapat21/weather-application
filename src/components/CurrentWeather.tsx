import {
  Box,
  CardMedia,
  Container,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import Humidity from "../assets/humidity.svg";
import Rain from "../assets/rain.svg";
import Snow from "../assets/snow.svg";
import Sun from "../assets/sun.svg";
import Thermometer from "../assets/thermometer.svg";
import WeatherCard from "./WeatherCard";
import WindIcon from "../assets/wind_icon.svg";
import Thunderstorm from "../assets/thunderstorm.svg";
import Cloud from "../assets/clouds.svg";
import { Info } from "@mui/icons-material";

export interface CurrentDataType {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  rain?: { "1h": number; "3h": number };
  snow?: { "1h": number; "3h": number };
  dt: Date;
  dt_txt?: string;
  pop?: number;
  sys: { country: string; sunset: Date; sunrise: Date };
  name: string;
}

const CurrentWeather = ({
  data,
  search,
}: {
  data: CurrentDataType;
  search: string;
}) => {
  //if (!data) {
  //  return (
  //    <Container sx={{ mt: "17vh" }}>
  //      <Box sx={{ display: "flex", justifyContent: "center" }}>
  //        Select a city
  //      </Box>
  //    </Container>
  //  );
  //}

  const image = (() => {
    const id = data.weather[0].id;

    switch (true) {
      case id < 300:
        return Thunderstorm;
      case id < 600:
        return Rain;
      case id < 700:
        return Snow;
      case id < 700:
        return `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      case id === 800:
        return Sun;
      case id < 900:
        return Cloud;
    }
  })();

  return (
    <Container sx={{ mt: "17vh", mb: "20px" }}>
      <Typography
        component="div"
        sx={{ mb: "20px" }}
        variant="h5"
        color="text.primary"
      >
        {search}'s Weather
      </Typography>
      <Grid
        container
        spacing={{ xs: 3, sm: 5, md: 4 }}
        columns={{ xs: 1, sm: 8, md: 8 }}
        alignItems="flex-start"
      >
        <WeatherCard
          name="Temparature"
          value={data.main.temp}
          unit="&deg; C"
          icon={
            <CardMedia
              component="img"
              sx={{ width: "100px", height: "100px" }}
              image={Thermometer}
            />
          }
          info={
            <Tooltip
              arrow
              title={
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography>Feels like</Typography>
                    <Typography>{data.main.feels_like}&deg;C</Typography>
                  </Box>
                  <Divider orientation="vertical" />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Max Temparature</Typography>
                    <Typography>{data.main.temp_max}&deg; C</Typography>
                  </Box>
                  <Divider orientation="vertical" />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Min Temparature</Typography>
                    <Typography>{data.main.temp_min}&deg; C</Typography>
                  </Box>
                </Box>
              }
            >
              <Info />
            </Tooltip>
          }
        />
        <WeatherCard
          name="Humidity"
          value={data.main.humidity}
          unit="%"
          icon={
            <CardMedia
              component="img"
              sx={{ width: "100px", height: "100px" }}
              image={Humidity}
            />
          }
        />
        <WeatherCard
          name="Wind Speed"
          value={data.wind.speed}
          unit="m/s"
          icon={
            <CardMedia
              component="img"
              sx={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
              image={WindIcon}
            />
          }
        />
        <WeatherCard
          name="Weather Condition"
          value={data.weather[0].main}
          unit=""
          icon={
            <CardMedia
              component="img"
              sx={{ width: "98px", height: "98px", marginRight: "5px" }}
              image={image}
            />
          }
          info={
            <Tooltip
              arrow
              title={<Typography>{data.weather[0].description}</Typography>}
            >
              <Info />
            </Tooltip>
          }
        />
      </Grid>
    </Container>
  );
};

export default CurrentWeather;
