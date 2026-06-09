import axios from "axios";

const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/name";
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchCountryInfo = async (name: string) => {
  const response = await axios.get(
    `${REST_COUNTRIES_URL}/${encodeURIComponent(name)}`,
  );
  const country = response.data[0];
  return {
    nome: country.name?.common || name,
    bandeira: country.flags?.svg || country.flags?.png || null,
    capital: country.capital?.[0] || "Não disponível",
    moeda: Object.values(country.currencies || {})[0]?.name || "Não disponível",
    idioma: Object.values(country.languages || {})[0] || "Não disponível",
    populacao: country.population || 0,
    latlng: country.latlng || [0, 0],
  };
};

export const fetchCityWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get(OPEN_METEO_URL, {
    params: {
      latitude,
      longitude,
      current_weather: true,
      timezone: "auto",
    },
  });

  return {
    temperatura: response.data.current_weather?.temperature,
    vento: response.data.current_weather?.windspeed,
    clima: response.data.current_weather?.weathercode,
  };
};
