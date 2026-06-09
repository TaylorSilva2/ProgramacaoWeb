import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const user = await registerUser(nome, email, senha);
    return res
      .status(201)
      .json({ id: user.id, nome: user.nome, email: user.email });
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const data = await loginUser(email, senha);
    return res.json(data);
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
};
