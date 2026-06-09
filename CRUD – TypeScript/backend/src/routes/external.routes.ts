import { Router } from "express";
import {
  getCityWeather,
  getCountryInfo,
} from "../controllers/external.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
router.use(authenticateToken);
router.get("/country/:nome", getCountryInfo);
router.get("/weather", getCityWeather);

export default router;
