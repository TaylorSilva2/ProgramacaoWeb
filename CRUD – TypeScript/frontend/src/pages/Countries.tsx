import { useEffect, useState } from "react";
import { fetchContinents as fetchContinentsForFilter } from "../services/continents";
import {
  createCountry,
  deleteCountry,
  fetchCountries,
  updateCountry,
} from "../services/countries";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

const Countries = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [continents, setContinents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [continentId, setContinentId] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState("nome");
  const [nome, setNome] = useState("");
  const [populacao, setPopulacao] = useState(0);
  const [idiomaOficial, setIdiomaOficial] = useState("");
  const [moeda, setMoeda] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchCountries(
        page,
        pageSize,
        search,
        continentId,
        sortBy,
      );
      setCountries(data.countries);
      setTotal(data.total);
    } catch (error) {
      setMessage("Erro ao carregar países.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadContinents = async () => {
      try {
        const data = await fetchContinentsForFilter(1, 100);
        setContinents(data.continentes);
      } catch {
        setMessage("Não foi possível carregar os continentes.");
        setType("error");
      }
    };
    loadContinents();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, continentId, sortBy]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editId) {
        await updateCountry(
          editId,
          nome,
          populacao,
          idiomaOficial,
          moeda,
          continentId || 0,
        );
        setMessage("País atualizado com sucesso.");
      } else {
        await createCountry(
          nome,
          populacao,
          idiomaOficial,
          moeda,
          continentId || 0,
        );
        setMessage("País criado com sucesso.");
      }
      setType("success");
      setNome("");
      setPopulacao(0);
      setIdiomaOficial("");
      setMoeda("");
      setEditId(null);
      fetchData();
    } catch (error) {
      setMessage("Erro ao salvar país.");
      setType("error");
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setNome(item.nome);
    setPopulacao(item.populacao);
    setIdiomaOficial(item.idiomaOficial);
    setMoeda(item.moeda);
    setContinentId(item.continenteId);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCountry(id);
      setMessage("País excluído.");
      setType("success");
      fetchData();
    } catch {
      setMessage("Não foi possível excluir o país.");
      setType("error");
    }
  };

  const handleNew = () => {
    setEditId(null);
    setNome("");
    setPopulacao(0);
    setIdiomaOficial("");
    setMoeda("");
    setContinentId(undefined);
    setMessage("");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Países</h1>
          <p>Gerencie países por continente e ordene por nome ou população.</p>
        </div>
        <div className="filter-row">
          <button onClick={handleNew} className="secondary-button">
            Novo
          </button>
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
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="nome">Ordenar por nome</option>
            <option value="populacao">Ordenar por população</option>
          </select>
        </div>
      </div>

      {message && <Notification message={message} type={type} />}

      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>{editId ? "Editar país" : "Novo país"}</h2>
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
          Idioma oficial
          <input
            value={idiomaOficial}
            onChange={(e) => setIdiomaOficial(e.target.value)}
            required
          />
        </label>
        <label>
          Moeda
          <input
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
            required
          />
        </label>
        <label>
          Continente
          <select
            value={continentId || ""}
            onChange={(e) =>
              setContinentId(Number(e.target.value) || undefined)
            }
            required
          >
            <option value="">Selecione</option>
            {continents.map((item) => (
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
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Continente</th>
                <th>População</th>
                <th>Idioma</th>
                <th>Moeda</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.continente?.nome}</td>
                  <td>{item.populacao.toLocaleString()}</td>
                  <td>{item.idiomaOficial}</td>
                  <td>{item.moeda}</td>
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

export default Countries;
