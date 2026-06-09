import { useEffect, useState } from "react";
import {
  createContinent,
  deleteContinent,
  fetchContinents,
} from "../services/continents";
import {
  createCountry,
  deleteCountry,
  fetchCountries,
} from "../services/countries";
import { createCity, deleteCity, fetchCities } from "../services/cities";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import api from "../services/axios";

const RegistrationPanel = () => {
  const [continents, setContinents] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [contName, setContName] = useState("");
  const [contDesc, setContDesc] = useState("");

  const [countryName, setCountryName] = useState("");
  const [countryPop, setCountryPop] = useState(0);
  const [countryLang, setCountryLang] = useState("");
  const [countryCurr, setCountryCurr] = useState("");
  const [countryContId, setCountryContId] = useState<number | undefined>(
    undefined,
  );

  const [cityName, setCityName] = useState("");
  const [cityPop, setCityPop] = useState(0);
  const [cityLat, setCityLat] = useState(0);
  const [cityLon, setCityLon] = useState(0);
  const [cityCountryId, setCityCountryId] = useState<number | undefined>(
    undefined,
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");
  const [externalQuery, setExternalQuery] = useState("");
  const [externalResult, setExternalResult] = useState<any | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const cts = await fetchContinents(1, 100);
      setContinents(cts.continentes || []);
      const ctrs = await fetchCountries(1, 200);
      setCountries(ctrs.countries || []);
      const cts2 = await fetchCities(1, 200);
      setCities(cts2.cities || []);
    } catch (err) {
      setMessage("Erro ao carregar dados.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreateContinent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContinent(contName, contDesc);
      setMessage("Continente criado.");
      setType("success");
      setContName("");
      setContDesc("");
      loadAll();
    } catch {
      setMessage("Erro ao criar continente.");
      setType("error");
    }
  };

  const handleCreateCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCountry(
        countryName,
        countryPop,
        countryLang,
        countryCurr,
        countryContId || 0,
      );
      setMessage("País criado.");
      setType("success");
      setCountryName("");
      setCountryPop(0);
      setCountryLang("");
      setCountryCurr("");
      setCountryContId(undefined);
      loadAll();
    } catch {
      setMessage("Erro ao criar país.");
      setType("error");
    }
  };

  const handleCreateCity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCity(cityName, cityPop, cityLat, cityLon, cityCountryId || 0);
      setMessage("Cidade criada.");
      setType("success");
      setCityName("");
      setCityPop(0);
      setCityLat(0);
      setCityLon(0);
      setCityCountryId(undefined);
      loadAll();
    } catch {
      setMessage("Erro ao criar cidade.");
      setType("error");
    }
  };

  return (
    <div className="page">
      <h1>Mundo CRUD - Painel de Controle</h1>
      {message && <Notification message={message} type={type} />}

      {loading ? (
        <Loading />
      ) : (
        <div className="panel-grid">
          <div className="panel-card">
            <h2>1. Continentes</h2>
            <div className="form-card">
              <form onSubmit={handleCreateContinent}>
                <label>
                  Nome
                  <input
                    value={contName}
                    onChange={(e) => setContName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Descrição
                  <input
                    value={contDesc}
                    onChange={(e) => setContDesc(e.target.value)}
                  />
                </label>
                <div style={{ textAlign: "right" }}>
                  <button className="save-purple" type="submit">
                    Salvar
                  </button>
                </div>
              </form>
            </div>

            <h4>LISTA CADASTRADA:</h4>
            {continents.map((c) => (
              <div className="list-item" key={c.id}>
                <div>
                  <strong>{c.nome}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    {c.descricao || "-"}
                  </div>
                </div>
                <button
                  className="danger-button"
                  onClick={() => {
                    deleteContinent(c.id);
                    loadAll();
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="panel-card">
            <h2>2. Países</h2>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  placeholder="Buscar na REST Countries"
                  value={externalQuery}
                  onChange={(e) => setExternalQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={async () => {
                    if (!externalQuery.trim()) return;
                    setLoading(true);
                    setExternalResult(null);
                    try {
                      const res = await api.get(
                        `/external/country/${encodeURIComponent(externalQuery)}`,
                      );
                      setExternalResult(res.data || null);
                      setMessage("");
                    } catch (err) {
                      setMessage("Nenhum país encontrado.");
                      setType("error");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Buscar
                </button>
              </div>
              {externalResult && (
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  {externalResult.bandeira && (
                    <img
                      src={externalResult.bandeira}
                      alt="Bandeira"
                      style={{ width: 80, borderRadius: 6 }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: 600 }}>{externalResult.nome}</div>
                    <div style={{ color: "var(--muted)" }}>
                      {externalResult.idioma} | {externalResult.moeda}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => {
                          setCountryName(externalResult.nome || externalQuery);
                          setCountryLang(externalResult.idioma || "");
                          setCountryCurr(externalResult.moeda || "");
                          setCountryPop(externalResult.populacao || 0);
                        }}
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="form-card">
              <form onSubmit={handleCreateCountry}>
                <label>
                  Nome
                  <input
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  População
                  <input
                    type="number"
                    value={countryPop}
                    onChange={(e) => setCountryPop(Number(e.target.value))}
                    required
                  />
                </label>
                <label>
                  Idioma oficial
                  <input
                    value={countryLang}
                    onChange={(e) => setCountryLang(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Moeda
                  <input
                    value={countryCurr}
                    onChange={(e) => setCountryCurr(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Continente
                  <select
                    value={countryContId || ""}
                    onChange={(e) =>
                      setCountryContId(Number(e.target.value) || undefined)
                    }
                    required
                  >
                    <option value="">Selecione</option>
                    {continents.map((ct) => (
                      <option key={ct.id} value={ct.id}>
                        {ct.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <div style={{ textAlign: "right" }}>
                  <button className="save-green" type="submit">
                    Salvar
                  </button>
                </div>
              </form>
            </div>

            <h4>LISTA CADASTRADA:</h4>
            {countries.map((c) => (
              <div
                className={`list-item ${c.nome.toLowerCase() === "china" ? "highlight" : ""}`}
                key={c.id}
              >
                <div>
                  <strong>{c.nome}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    {c.idiomaOficial} | {c.moeda}
                  </div>
                </div>
                <button
                  className="danger-button"
                  onClick={() => {
                    deleteCountry(c.id);
                    loadAll();
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="panel-card">
            <h2>3. Cidades</h2>
            <div className="form-card">
              <form onSubmit={handleCreateCity}>
                <label>
                  Nome
                  <input
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  População
                  <input
                    type="number"
                    value={cityPop}
                    onChange={(e) => setCityPop(Number(e.target.value))}
                    required
                  />
                </label>
                <label style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    Lat
                    <input
                      type="number"
                      step="0.0001"
                      value={cityLat}
                      onChange={(e) => setCityLat(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    Lon
                    <input
                      type="number"
                      step="0.0001"
                      value={cityLon}
                      onChange={(e) => setCityLon(Number(e.target.value))}
                      required
                    />
                  </div>
                </label>
                <label>
                  País
                  <select
                    value={cityCountryId || ""}
                    onChange={(e) =>
                      setCityCountryId(Number(e.target.value) || undefined)
                    }
                    required
                  >
                    <option value="">Selecione</option>
                    {countries.map((ct) => (
                      <option key={ct.id} value={ct.id}>
                        {ct.nome}
                      </option>
                    ))}
                  </select>
                </label>
                <div style={{ textAlign: "right" }}>
                  <button className="save-orange" type="submit">
                    Salvar
                  </button>
                </div>
              </form>
            </div>

            <h4>LISTA CADASTRADA:</h4>
            {cities.map((c) => (
              <div className="list-item" key={c.id}>
                <div>
                  <strong>{c.nome}</strong>
                  <div style={{ color: "var(--muted)" }}>
                    {c.pais?.nome} | {c.populacao.toLocaleString()}
                  </div>
                </div>
                <button
                  className="danger-button"
                  onClick={() => {
                    deleteCity(c.id);
                    loadAll();
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPanel;
