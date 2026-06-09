import { Request, Response } from "express";
import {
  fetchCityWeather,
  fetchCountryInfo,
} from "../services/external.service";

export const getCountryInfo = async (req: Request, res: Response) => {
  try {
    const { nome } = req.params;
    const data = await fetchCountryInfo(nome);
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Não foi possível buscar informações do país" });
  }
};

export const getCityWeather = async (req: Request, res: Response) => {
  try {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const data = await fetchCityWeather(latitude, longitude);
    res.json(data);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Não foi possível buscar o clima da cidade" });
  }
};
