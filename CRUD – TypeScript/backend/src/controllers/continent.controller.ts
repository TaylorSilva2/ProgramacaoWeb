import { Request, Response } from "express";
import {
  createContinentService,
  deleteContinentService,
  getContinentByIdService,
  getContinentsService,
  updateContinentService,
} from "../services/continent.service";

export const createContinent = async (req: Request, res: Response) => {
  try {
    const { nome, descricao } = req.body;
    const continent = await createContinentService(nome, descricao);
    res.status(201).json(continent);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getContinents = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const search = String(req.query.search || "");

  const data = await getContinentsService(page, pageSize, search || undefined);
  res.json(data);
};

export const getContinentById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const continent = await getContinentByIdService(id);
  if (!continent) {
    return res.status(404).json({ message: "Continente não encontrado" });
  }
  res.json(continent);
};

export const updateContinent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, descricao } = req.body;
  try {
    const continent = await updateContinentService(id, nome, descricao);
    res.json(continent);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteContinent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteContinentService(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
