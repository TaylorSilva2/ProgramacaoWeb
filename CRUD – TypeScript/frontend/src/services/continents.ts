import api from "./axios";

export const fetchContinents = async (page = 1, pageSize = 10, search = "") => {
  const response = await api.get("/continents", {
    params: { page, pageSize, search },
  });
  return response.data;
};

export const createContinent = async (nome: string, descricao: string) => {
  const response = await api.post("/continents", { nome, descricao });
  return response.data;
};

export const updateContinent = async (
  id: number,
  nome: string,
  descricao: string,
) => {
  const response = await api.put(`/continents/${id}`, { nome, descricao });
  return response.data;
};

export const deleteContinent = async (id: number) => {
  await api.delete(`/continents/${id}`);
};
