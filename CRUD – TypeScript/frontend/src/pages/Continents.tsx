import { useEffect, useState } from "react";
import {
  createContinent,
  deleteContinent,
  fetchContinents,
  updateContinent,
} from "../services/continents";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

const Continents = () => {
  const [continents, setContinents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchContinents(page, pageSize, search);
      setContinents(data.continentes);
      setTotal(data.total);
    } catch (error) {
      setMessage("Não foi possível carregar continentes.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editId) {
        await updateContinent(editId, nome, descricao);
        setMessage("Continente atualizado com sucesso.");
      } else {
        await createContinent(nome, descricao);
        setMessage("Continente criado com sucesso.");
      }
      setType("success");
      setNome("");
      setDescricao("");
      setEditId(null);
      fetchData();
    } catch (error) {
      setMessage("Erro ao salvar continente.");
      setType("error");
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setNome(item.nome);
    setDescricao(item.descricao || "");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteContinent(id);
      setMessage("Continente excluído.");
      setType("success");
      fetchData();
    } catch (error) {
      setMessage("Não foi possível excluir.");
      setType("error");
    }
  };

  const handleNew = () => {
    setEditId(null);
    setNome("");
    setDescricao("");
    setMessage("");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Continentes</h1>
          <p>Gerencie todos os continentes da aplicação.</p>
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
        </div>
      </div>

      {message && <Notification message={message} type={type} />}

      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>{editId ? "Editar continente" : "Novo continente"}</h2>
        <label>
          Nome
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
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
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {continents.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.descricao || "-"}</td>
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

export default Continents;
