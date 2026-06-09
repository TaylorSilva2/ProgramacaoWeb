import { Router } from "express";
import {
  createCity,
  deleteCity,
  getCities,
  getCitiesByContinent,
  getCitiesByCountry,
  getCityById,
  updateCity,
} from "../controllers/city.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.post("/", createCity);
router.get("/", getCities);
router.get("/:id", getCityById);
router.get("/country/:countryId", getCitiesByCountry);
router.get("/continent/:continentId", getCitiesByContinent);
router.put("/:id", updateCity);
router.delete("/:id", deleteCity);

export default router;
