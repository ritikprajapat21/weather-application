import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export interface RowType {
  date: string;
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
  pop: number;
  weather: { id: number; main: string; description: string; icon: string }[];
}

const ForecastWeather = ({ data }: { data: RowType[] }) => {
  if (!data) {
    return (
      <Container sx={{ mt: "17vh" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>Loading...</Box>
      </Container>
    );
  }

  return (
    <Container sx={{ my: "25px" }}>
      <Typography
        component="div"
        sx={{ mb: "20px" }}
        variant="h5"
        color="text.primary"
      >
        Forecast Weather Report
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="Forecast weather data table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Temparature</TableCell>
              <TableCell>Weather Condition</TableCell>
              <TableCell>Precipitation Chances</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.main.temp}</TableCell>
                <TableCell>{row.weather[0].main}</TableCell>
                <TableCell>
                  {((row?.pop as number) * 100).toFixed(2)} %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ForecastWeather;
