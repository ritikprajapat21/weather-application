import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import {
  Alert,
  Box,
  Container,
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import CurrentWeather, { CurrentDataType } from "./components/CurrentWeather";
import ForecastWeather, { RowType } from "./components/ForecastWeather";
import Chart from "./components/Chart";

interface AlertType {
  open: boolean;
  content: string;
}

function App() {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = responsiveFontSizes(createTheme({ palette: { mode: mode } }));
  const [search, setSearch] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [currentData, setCurrentData] = useState<CurrentDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<RowType[] | null>(null);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const fetchData = async () => {
      setLoading(true);
      setAlert({ content: "", open: false });
      try {
        const [currentData, forecastData] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${search || input}&units=metric&appid=${apiKey}`,
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${search || input}&units=metric&appid=${apiKey}`,
          ),
        ]);
        setCurrentData(currentData.data);
        let rows: RowType[] = [];
        forecastData.data.list.forEach(
          (record: {
            dt_txt: string;
            main: any;
            pop: number;
            weather: any;
          }) => {
            if (
              !rows.some(
                (d) =>
                  d.date ===
                  new Date(record.dt_txt as string).toLocaleDateString(),
              )
            ) {
              rows.push({
                date: new Date(record?.dt_txt as string).toLocaleDateString(),
                main: record.main,
                pop: record.pop as number,
                weather: record.weather,
              });
            }
          },
        );
        setForecastData(rows);
      } catch (error) {
        setCurrentData(null);
        setForecastData(null);
        if (axios.isAxiosError(error)) {
          if (!search && !input) {
            setAlert({ content: "Please select a city", open: true });
          }
          if (error?.response?.status === 404) {
            setAlert({ content: "Enter a valid city name", open: true });
          }
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300);

    return () => clearTimeout(timer);
  }, [search, input]);

  return (
    <>
      <Container>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Stack>
            <NavBar
              mode={mode}
              search={search}
              setSearch={setSearch}
              toggleColorMode={toggleColorMode}
              input={input}
              setInput={setInput}
            />
            {alert?.open && (
              <Box sx={{ mt: "15vh" }}>
                <Alert
                  severity="error"
                  onClose={() => setAlert({ content: "", open: false })}
                >
                  <Typography>{alert?.content || ""}</Typography>
                </Alert>
              </Box>
            )}
            {loading ? (
              <Box sx={{ marginX: "auto", mt: "20px" }}>Loading...</Box>
            ) : (
              <>
                {currentData && (
                  <CurrentWeather
                    data={currentData as CurrentDataType}
                    search={search || input}
                  />
                )}
                {forecastData && (
                  <>
                    <ForecastWeather data={forecastData as RowType[]} />
                    <Chart data={forecastData as RowType[]} />
                  </>
                )}
              </>
            )}
          </Stack>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default App;
