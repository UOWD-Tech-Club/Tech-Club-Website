import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import eventsRoutes from "./Routes/eventRoutes.js";
import newsRoutes from "./Routes/newsRoutes.js";
import "./Tasks/scheduled.js";
import newsManagementRoutes from "./Routes/newsManagementRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import eventManagementRoutes from "./Routes/eventManagementRoutes.js";
import executiveManagementRoutes from "./Routes/executivesManagementRoutes.js";
//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

/*
import eventsRoutes from "./Routes/eventRoutes.js";
import newsRoutes from "./Routes/newsRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import "./Tasks/scheduled.js";
*/

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/events", eventsRoutes);
app.use("/news", newsRoutes);
app.use("/newsManagement", newsManagementRoutes);
app.use("/eventManagement", eventManagementRoutes);
app.use("/executivesManagement", executiveManagementRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the TechClub Website",
  });
});

const PORT = process.env.LOCAL_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
