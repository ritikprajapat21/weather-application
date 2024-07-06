import { Box, Card, Grid, Typography } from "@mui/material";

const WeatherCard = ({
  name,
  value,
  unit,
  icon,
  info,
}: {
  name: string;
  value: number | string;
  unit: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
}) => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        sx={{
          display: "flex",
          borderRadius: "15px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        raised
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: 4 }}>
          <Box sx={{ display: "flex", gap: "6px" }}>
            <Typography component="div" variant="h5" color="text.secondary">
              {name}
            </Typography>
            {info}
          </Box>
          <Typography
            sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
            variant="h2"
            color="text.primary"
          >
            {value}
            <Typography variant="subtitle1" color="text.secondary">
              {unit}
            </Typography>
          </Typography>
        </Box>
        <Box sx={{ display: { sm: "none", md: "block" } }}>{icon}</Box>
      </Card>
    </Grid>
  );
};

export default WeatherCard;
