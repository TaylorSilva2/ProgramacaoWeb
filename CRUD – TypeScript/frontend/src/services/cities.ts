import api from "./axios";

export const fetchCities = async (
  page = 1,
  pageSize = 10,
  search = "",
  countryId?: number,
  continentId?: number,
) => {
  const response = await api.get("/cities", {
    params: { page, pageSize, search, countryId, continentId },
  });
  return response.data;
};

export const createCity = async (
  nome: string,
  populacao: number,
  latitude: number,
  longitude: number,
  paisId: number,
) => {
  const response = await api.post("/cities", {
    nome,
    populacao,
    latitude,
    longitude,
    paisId,
  });
  return response.data;
};

export const updateCity = async (
  id: number,
  nome: string,
  populacao: number,
  latitude: number,
  longitude: number,
  paisId: number,
) => {
  const response = await api.put(`/cities/${id}`, {
    nome,
    populacao,
    latitude,
    longitude,
    paisId,
  });
  return response.data;
};

export const deleteCity = async (id: number) => {
  await api.delete(`/cities/${id}`);
};
