import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import eventsRoutes from "./Routes/eventRoutes.js";
import newsRoutes from "./Routes/newsRoutes.js";
import "./Tasks/scheduled.js";
import newsManagementRoutes from "./Routes/newsManagementRoutes.js";

//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventsRoutes);
app.use("/news", newsRoutes);
app.use("/newsManagement", newsManagementRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the TechClub Website",
  });
});

const PORT = process.env.LOCAL_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
