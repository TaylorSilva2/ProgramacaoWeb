import { Router } from "express";
import {
  createContinent,
  deleteContinent,
  getContinents,
  getContinentById,
  updateContinent,
} from "../controllers/continent.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticateToken);
router.post("/", createContinent);
router.get("/", getContinents);
router.get("/:id", getContinentById);
router.put("/:id", updateContinent);
router.delete("/:id", deleteContinent);

export default router;
