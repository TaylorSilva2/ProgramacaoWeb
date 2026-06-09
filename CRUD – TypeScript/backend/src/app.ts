import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import continentRoutes from "./routes/continent.routes";
import countryRoutes from "./routes/country.routes";
import cityRoutes from "./routes/city.routes";
import externalRoutes from "./routes/external.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/continents", continentRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/external", externalRoutes);

app.use(errorHandler);

export default app;
