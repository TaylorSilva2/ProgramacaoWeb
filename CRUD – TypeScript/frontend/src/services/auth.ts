import api from "./axios";

export const login = async (email: string, senha: string) => {
  const response = await api.post("/auth/login", { email, senha });
  return response.data;
};

export const register = async (nome: string, email: string, senha: string) => {
  const response = await api.post("/auth/register", { nome, email, senha });
  return response.data;
};
