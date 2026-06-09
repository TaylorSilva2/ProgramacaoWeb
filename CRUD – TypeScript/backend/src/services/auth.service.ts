import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const registerUser = async (
  nome: string,
  email: string,
  senha: string,
) => {
  const existingUser = await prisma.usuario.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);
  const user = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: hashedPassword,
    },
  });

  return user;
};

export const loginUser = async (email: string, senha: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  const isValidPassword = await bcrypt.compare(senha, user.senha);
  if (!isValidPassword) {
    throw new Error("Credenciais inválidas");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT não configurado");
  }

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "8h" });
  return { token, user: { id: user.id, nome: user.nome, email: user.email } };
};
