import api from "./axios";

export const fetchCountries = async (
  page = 1,
  pageSize = 10,
  search = "",
  continentId?: number,
  sortBy = "nome",
) => {
  const response = await api.get("/countries", {
    params: { page, pageSize, search, continentId, sortBy },
  });
  return response.data;
};

export const createCountry = async (
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number,
) => {
  const response = await api.post("/countries", {
    nome,
    populacao,
    idiomaOficial,
    moeda,
    continenteId,
  });
  return response.data;
};

export const updateCountry = async (
  id: number,
  nome: string,
  populacao: number,
  idiomaOficial: string,
  moeda: string,
  continenteId: number,
) => {
  const response = await api.put(`/countries/${id}`, {
    nome,
    populacao,
    idiomaOficial,
    moeda,
    continenteId,
  });
  return response.data;
};

export const deleteCountry = async (id: number) => {
  await api.delete(`/countries/${id}`);
};
