import { useEffect, useState } from "react";
import api from "../services/axios";
import Notification from "../components/Notification";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [stats, setStats] = useState({
    continents: 0,
    countries: 0,
    cities: 0,
  });
  const [searchCountry, setSearchCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState<any>(null);
  const [weatherInfo, setWeatherInfo] = useState<any>(null);
  const [continentsList, setContinentsList] = useState<any[]>([]);
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);
  const [countryFlags, setCountryFlags] = useState<
    Record<number, string | null>
  >({});
  const [cityWeatherMap, setCityWeatherMap] = useState<Record<number, any>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatsAndLists = async () => {
      try {
        const [continentsRes, countriesRes, citiesRes] = await Promise.all([
          api.get("/continents", { params: { page: 1, pageSize: 100 } }),
          api.get("/countries", { params: { page: 1, pageSize: 200 } }),
          api.get("/cities", { params: { page: 1, pageSize: 200 } }),
        ]);

        setStats({
          continents: continentsRes.data.total,
          countries: countriesRes.data.total,
          cities: citiesRes.data.total,
        });

        setContinentsList(continentsRes.data.continentes || []);
        setCountriesList(countriesRes.data.countries || []);
        setCitiesList(citiesRes.data.cities || []);

        // fetch flags for the first 20 countries to avoid many requests
        const flagsMap: Record<number, string | null> = {};
        const slice = (countriesRes.data.countries || []).slice(0, 20);
        await Promise.all(
          slice.map(async (c: any) => {
            try {
              const res = await api.get(
                `/external/country/${encodeURIComponent(c.nome)}`,
              );
              flagsMap[c.id] = res.data.bandeira || null;
            } catch {
              flagsMap[c.id] = null;
            }
          }),
        );
        setCountryFlags(flagsMap);
      } catch (error) {
        setMessage("Não foi possível carregar os dados do dashboard.");
      }
    };

    fetchStatsAndLists();
  }, []);

  const handleFetchCountry = async () => {
    if (!searchCountry.trim()) {
      setMessage("Digite o nome de um país para buscar.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await api.get(`/external/country/${searchCountry}`);
      setCountryInfo(response.data);
    } catch (error) {
      setMessage("Erro ao buscar país. Verifique o nome.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeather = async () => {
    if (!countryInfo) {
      setMessage("Busque um país antes de ver o clima.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const [latitude, longitude] = countryInfo.latlng || [0, 0];
      const weather = await api.get("/external/weather", {
        params: {
          latitude,
          longitude,
        },
      });
      setWeatherInfo(weather.data);
    } catch (error) {
      setMessage("Não foi possível buscar o clima.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCityWeather = async (city: any) => {
    if (!city) return;
    try {
      const res = await api.get("/external/weather", {
        params: { latitude: city.latitude, longitude: city.longitude },
      });
      setCityWeatherMap((prev) => ({ ...prev, [city.id]: res.data }));
    } catch {
      setMessage("Não foi possível buscar clima da cidade.");
      setType("error");
    }
  };

  return (
    <div className="page">
      <h1>Dashboard</h1>
      {message && <Notification message={message} type="error" />}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Continentes</h3>
          <p>{stats.continents}</p>
        </div>
        <div className="stat-card">
          <h3>Países</h3>
          <p>{stats.countries}</p>
        </div>
        <div className="stat-card">
          <h3>Cidades</h3>
          <p>{stats.cities}</p>
        </div>
      </div>
      <section className="panel-grid">
        <div className="panel-card">
          <h2>Continentes</h2>
          {continentsList.map((c) => (
            <div
              key={c.id}
              style={{ padding: 8, borderBottom: "1px solid #eee" }}
            >
              <strong>{c.nome}</strong>
              <div style={{ color: "var(--muted)" }}>{c.descricao || "-"}</div>
            </div>
          ))}
        </div>

        <div className="panel-card">
          <h2>Países</h2>
          {countriesList.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: 8,
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ width: 56, height: 36 }}>
                {countryFlags[c.id] ? (
                  <img
                    src={countryFlags[c.id] as string}
                    alt="flag"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#f1f5f9",
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <strong>{c.nome}</strong>
                <div style={{ color: "var(--muted)" }}>
                  {c.idiomaOficial} | {c.moeda}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="panel-card">
          <h2>Cidades</h2>
          {citiesList.map((city) => (
            <div
              key={city.id}
              style={{ padding: 8, borderBottom: "1px solid #eee" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{city.nome}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    {city.pais?.nome} • {city.populacao.toLocaleString()}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    className="secondary-button"
                    onClick={() => handleFetchCityWeather(city)}
                  >
                    Ver clima
                  </button>
                </div>
              </div>
              {cityWeatherMap[city.id] && (
                <div style={{ marginTop: 8 }}>
                  <div>
                    <strong>Temperatura:</strong>{" "}
                    {cityWeatherMap[city.id].temperatura}°C
                  </div>
                  <div>
                    <strong>Vento:</strong> {cityWeatherMap[city.id].vento} km/h
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
