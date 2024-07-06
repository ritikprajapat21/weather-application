import { Container, Typography } from "@mui/material";
import { RowType } from "./ForecastWeather";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

interface TempDataType {
  date: string;
  temp: number;
}

const Chart = ({ data }: { data: RowType[] }) => {
  const [tempData, setTempData] = useState<TempDataType[] | null>(null);
  useEffect(() => {
    const tempData: TempDataType[] = [];
    data.forEach((el) => {
      tempData.push({ date: el.date, temp: el.main.temp });
    });
    setTempData(tempData);
  }, [data]);

  return (
    <Container sx={{ my: "25px", height: "60vh", mx: "auto" }}>
      <Typography
        component="div"
        sx={{ mb: "20px" }}
        variant="h5"
        color="text.primary"
      >
        Temperature Trend
      </Typography>
      <ResponsiveContainer>
        <LineChart data={tempData as TempDataType[]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="temp" />
          <Tooltip />
          <Legend />
          <Line dataKey="temp" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
