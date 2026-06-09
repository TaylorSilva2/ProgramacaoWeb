import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountryById,
  getCountries,
  getCountriesByContinent,
  updateCountry,
} from "../controllers/country.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.post("/", createCountry);
router.get("/", getCountries);
router.get("/:id", getCountryById);
router.get("/continent/:continentId", getCountriesByContinent);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

export default router;
