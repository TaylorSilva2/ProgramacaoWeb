import { useEffect, useState } from "react";
import { fetchContinents } from "../services/continents";
import { fetchCountries } from "../services/countries";
import {
  createCity,
  deleteCity,
  fetchCities,
  updateCity,
} from "../services/cities";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

const Cities = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [continents, setContinents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [search, setSearch] = useState("");
  const [continentId, setContinentId] = useState<number | undefined>(undefined);
  const [countryId, setCountryId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchCities(
        page,
        pageSize,
        search,
        countryId,
        continentId,
      );
      setCities(data.cities);
      setTotal(data.total);
      const sum = (data.cities || []).reduce(
        (s: number, c: any) => s + (Number(c.populacao) || 0),
        0,
      );
      setTotalPopulation(sum);
    } catch {
      setMessage("Erro ao carregar cidades.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const continentData = await fetchContinents(1, 100);
        setContinents(continentData.continentes);
        const countryData = await fetchCountries(1, 100);
        setCountries(countryData.countries);
      } catch {
        setMessage("Erro ao carregar filtros.");
        setType("error");
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, countryId, continentId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editId) {
        await updateCity(
          editId,
          nome,
          populacao,
          latitude,
          longitude,
          Number(countryId),
        );
        setMessage("Cidade atualizada com sucesso.");
      } else {
        await createCity(
          nome,
          populacao,
          latitude,
          longitude,
          Number(countryId),
        );
        setMessage("Cidade criada com sucesso.");
      }
      setType("success");
      setNome("");
      setPopulacao(0);
      setLatitude(0);
      setLongitude(0);
      setEditId(null);
      fetchData();
    } catch {
      // try to read server message
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = (arguments && arguments[0]) || null;
      const serverMessage = err?.response?.data?.message;
      setMessage(serverMessage || "Erro ao salvar cidade.");
      setType("error");
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setNome(item.nome);
    setPopulacao(item.populacao);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setCountryId(item.paisId);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCity(id);
      setMessage("Cidade excluída.");
      setType("success");
      fetchData();
    } catch {
      setMessage("Não foi possível excluir a cidade.");
      setType("error");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Cidades</h1>
          <p>Gerencie cidades com filtros por país, continente e ordenação.</p>
        </div>
        <div className="filter-row">
          <input
            placeholder="Buscar por nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => fetchData()}
          />
          <select
            value={continentId || ""}
            onChange={(e) =>
              setContinentId(Number(e.target.value) || undefined)
            }
          >
            <option value="">Todos continentes</option>
            {continents.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
          <select
            value={countryId || ""}
            onChange={(e) => setCountryId(Number(e.target.value) || undefined)}
          >
            <option value="">Todos países</option>
            {countries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && <Notification message={message} type={type} />}

      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>{editId ? "Editar cidade" : "Nova cidade"}</h2>
        <label>
          Nome
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          População
          <input
            type="number"
            value={populacao}
            onChange={(e) => setPopulacao(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            required
          />
        </label>
        <label>
          País
          <select
            value={countryId || ""}
            onChange={(e) => setCountryId(Number(e.target.value) || undefined)}
            required
          >
            <option value="">Selecione</option>
            {countries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="primary-button">
          {editId ? "Atualizar" : "Criar"}
        </button>
      </form>

      {loading ? (
        <Loading />
      ) : (
        <div className="table-card">
          <div style={{ marginBottom: 12, fontWeight: 600 }}>
            Total de habitantes (nesta página):{" "}
            {totalPopulation.toLocaleString()}
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>País</th>
                <th>Continente</th>
                <th>População</th>
                <th>Coordenadas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.pais?.nome}</td>
                  <td>{item.pais?.continente?.nome}</td>
                  <td>{item.populacao.toLocaleString()}</td>
                  <td>
                    {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="secondary-button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="danger-button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} de {Math.ceil(total / pageSize) || 1}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.ceil(total / pageSize)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cities;
