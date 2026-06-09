import { Request, Response } from "express";
import {
  createCityService,
  deleteCityService,
  getCityByIdService,
  getCitiesByContinentService,
  getCitiesByCountryService,
  getCitiesService,
  updateCityService,
} from "../services/city.service";
import prisma from "../prisma/client";

export const createCity = async (req: Request, res: Response) => {
  try {
    const { nome, populacao, latitude, longitude, paisId } = req.body;
    const pid = Number(paisId);
    if (!pid || pid <= 0) {
      return res
        .status(400)
        .json({ message: "paisId inválido. Selecione um país válido." });
    }

    const country = await prisma.pais.findUnique({ where: { id: pid } });
    if (!country) {
      return res
        .status(400)
        .json({ message: "País não encontrado para o paisId informado." });
    }
    const city = await createCityService(
      nome,
      Number(populacao),
      Number(latitude),
      Number(longitude),
      pid,
    );
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getCities = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const search = String(req.query.search || "");
  const countryId = req.query.countryId
    ? Number(req.query.countryId)
    : undefined;
  const continentId = req.query.continentId
    ? Number(req.query.continentId)
    : undefined;

  const data = await getCitiesService(
    page,
    pageSize,
    search || undefined,
    countryId,
    continentId,
  );
  res.json(data);
};

export const getCityById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const city = await getCityByIdService(id);
  if (!city) {
    return res.status(404).json({ message: "Cidade não encontrada" });
  }
  res.json(city);
};

export const getCitiesByCountry = async (req: Request, res: Response) => {
  const countryId = Number(req.params.countryId);
  const cities = await getCitiesByCountryService(countryId);
  res.json(cities);
};

export const getCitiesByContinent = async (req: Request, res: Response) => {
  const continentId = Number(req.params.continentId);
  const cities = await getCitiesByContinentService(continentId);
  res.json(cities);
};

export const updateCity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, populacao, latitude, longitude, paisId } = req.body;
  try {
    const pid = Number(paisId);
    if (!pid || pid <= 0) {
      return res
        .status(400)
        .json({ message: "paisId inválido. Selecione um país válido." });
    }

    const country = await prisma.pais.findUnique({ where: { id: pid } });
    if (!country) {
      return res
        .status(400)
        .json({ message: "País não encontrado para o paisId informado." });
    }
    const city = await updateCityService(
      id,
      nome,
      Number(populacao),
      Number(latitude),
      Number(longitude),
      pid,
    );
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await deleteCityService(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
