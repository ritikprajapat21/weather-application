import * as React from "react";
import { Autocomplete, PaletteMode, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

function NavBar({
  mode,
  toggleColorMode,
  search,
  setSearch,
  input,
  setInput,
}: NavBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const options = [
    "Abu Dhabi, United Arab Emirates",
    "Abuja, Nigeria",
    "Accra, Ghana",
    "Addis Ababa, Ethiopia",
    "Ahmedabad, Gujarat",
    "Algiers, Algeria",
    "Amman, Jordan",
    "Amritsar, Punjab",
    "Amsterdam, Netherlands",
    "Ankara, Turkey",
    "Antananarivo, Madagascar",
    "Apia, Samoa",
    "Arabia Riyadh, Saudi",
    "Ashgabat, Turkmenistan",
    "Asmara, Eritrea",
    "Astana, Kazakhstan",
    "Asuncion, Paraguay",
    "Athens, Greece",
    "Baghdad, Iraq",
    "Baku, Azerbaijan",
    "Bamako, Mali",
    "Bangalore, Karnataka",
    "Bangkok, Thailand",
    "Banjul, Gambia",
    "Beijing, China",
    "Beirut, Lebanon",
    "Belgrade, Serbia",
    "Belmopan, Belize",
    "Berlin, Germany",
    "Bern, Switzerland",
    "Bishkek, Kyrgyzstan",
    "Bissau, Guinea-Bissau",
    "Bogota, Colombia",
    "Brasilia, Brazil",
    "Bratislava, Slovakia",
    "Bridgetown, Barbados",
    "Brussels, Belgium",
    "Bucharest, Romania",
    "Budapest, Hungary",
    "Cairo, Egypt",
    "Canberra, Australia",
    "Caracas, Venezuela",
    "Chennai, TamilNadu",
    "Chisinau, Moldova",
    "Conakry, Guinea",
    "Copenhagen, Denmark",
    "Dakar, Senegal",
    "Damascus, Syria",
    "Dhaka, Bangladesh",
    "Djibouti, Djibouti",
    "Dodoma, Tanzania",
    "Doha, Qatar",
    "Dublin, Ireland",
    "Dushanbe, Tajikistan",
    "Edinburgh, Scotland",
    "Funafuti, Tuvalu",
    "Gaborone, Botswana",
    "Georgetown, Guyana",
    "Gitega, Burundi",
    "Hanoi, Vietnam",
    "Harare, Zimbabwe",
    "Havana, Cuba",
    "Helsinki, Finland",
    "Hyderabad, Telangana",
    "Islamabad, Pakistan",
    "Jaipur, Rajasthan",
    "Jakarta, Indonesia",
    "Jammu, Jammu",
    "Jerusalem, Israel",
    "Jerusalem, Palestine",
    "Kabul, Afghanistan",
    "Kampala, Uganda",
    "Kathmandu, Nepal",
    "Khartoum, Sudan",
    "Kigali, Rwanda",
    "Kingston, Jamaica",
    "Kolkata, WestBengal",
    "Kuala, Malaysia",
    "KuwaitCity, Kuwait",
    "Kyiv, Ukraine",
    "Libreville, Gabon",
    "Lilongwe, Malawi",
    "Lima, Peru",
    "Lisbon, Portugal",
    "Ljubljana, Slovenia",
    "Lome, Togo",
    "London, UnitedKingdom",
    "Luanda, Angola",
    "Lusaka, Zambia",
    "Luxembourg, Luxembourg",
    "Madrid, Spain",
    "Male, Maldives",
    "Managua, Nicaragua",
    "Manama, Bahrain",
    "Manila, Philippines",
    "Maputo, Mozambique",
    "Maseru, Lesotho",
    "Melekeok, Palau",
    "Mexico City, Mexico",
    "Minsk, Belarus",
    "Mogadishu, Somalia",
    "Monaco, Monaco",
    "Monrovia, Liberia",
    "Montevideo, Uruguay",
    "Moroni, Comoros",
    "Moscow, Russia",
    "Mumbai, Maharashtra",
    "Muscat, Oman",
    "N'Djamena, Chad",
    "Nairobi, Kenya",
    "Nassau, Bahamas",
    "New Delhi, India",
    "Niamey, Niger",
    "Nicosia, Cyprus",
    "Nouakchott, Mauritania",
    "Nuku'alofa, Tonga",
    "Oslo, Norway",
    "Ottawa, Canada",
    "PanamaCity, Panama",
    "Paramaribo, Suriname",
    "Paris, France",
    "Podgorica, Montenegro",
    "Pristina, Kosovo",
    "Pune, Maharashtra",
    "Quito, Ecuador",
    "Rabat, Morocco",
    "Reykjavik, Iceland",
    "Riga, Latvia",
    "Rome, Italy",
    "Roseau, Dominica",
    "Sana'a, Yemen",
    "Santiago, Chile",
    "Seoul, South Korea",
    "Singapore, Singapore",
    "Sofia, Bulgaria",
    "Srinagar, Kashmir",
    "Stockholm, Sweden",
    "Surat, Gujarat",
    "Suva, Fiji",
    "Taipei, Taiwan",
    "Tallinn, Estonia",
    "Tashkent, Uzbekistan",
    "Tbilisi, Georgia",
    "Tegucigalpa, Honduras",
    "Tehran, Iran",
    "Thimphu, Bhutan",
    "Tokyo, Japan",
    "Tripoli, Libya",
    "Tunis, Tunisia",
    "Ulaanbaatar, Mongolia",
    "Vaduz, Liechtenstein",
    "Valletta, Malta",
    "Vatican City, Vatican City",
    "Victoria, Seychelles",
    "Vienna, Austria",
    "Vientiane, Laos",
    "Vilnius, Lithuania",
    "Warsaw, Poland",
    "Washington D.C., United States",
    "Wellington, New Zealand",
    "Windhoek, Namibia",
    "Yaounde, Cameroon",
    "Yerevan, Armenia",
    "Zagreb, Croatia",
  ];

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
          mb: 2,
        }}
      >
        <Container>
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                px: 0,
              }}
            >
              <Typography variant="h6" color="text.primary">
                Climico
              </Typography>
              <Box sx={{ display: { md: "flex" }, marginX: "auto" }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Autocomplete
                    options={options}
                    value={search || input}
                    onChange={(_, newValue) => setSearch(newValue || "")}
                    inputValue={input}
                    onInputChange={(_, newValue) => setInput(newValue || "")}
                    sx={{ width: 190 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Enter place name" />
                    )}
                  />
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
