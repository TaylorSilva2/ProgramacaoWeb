import { Request, Response } from "express";
import {
  createCountryService,
  deleteCountryService,
  getCountryByIdService,
  getCountriesByContinentService,
  getCountriesService,
  updateCountryService,
} from "../services/country.service";

export const createCountry = async (req: Request, res: Response) => {
  try {
    const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;
    const country = await createCountryService(
      nome,
      Number(populacao),
      idiomaOficial,
      moeda,
      Number(continenteId),
    );
    res.status(201).json(country);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getCountries = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const search = String(req.query.search || "");
  const continentId = req.query.continentId
    ? Number(req.query.continentId)
    : undefined;
  const sortBy = String(req.query.sortBy || "nome");

  const data = await getCountriesService(
    page,
    pageSize,
    search || undefined,
    continentId,
    sortBy,
  );
  res.json(data);
};

export const getCountryById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const country = await getCountryByIdService(id);
  if (!country) {
    return res.status(404).json({ message: "País não encontrado" });
  }
  res.json(country);
};

export const getCountriesByContinent = async (req: Request, res: Response) => {
  const continentId = Number(req.params.continentId);
  const countries = await getCountriesByContinentService(continentId);
  res.json(countries);
};

export const updateCountry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, populacao, idiomaOficial, moeda, continenteId } = req.body;
  try {
    const country = await updateCountryService(
      id,
      nome,
      Number(populacao),
      idiomaOficial,
      moeda,
      Number(continenteId),
    );
    res.json(country);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteCountryService(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
