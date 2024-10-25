import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import eventRoutes from "./Routes/eventsRoutes.js";

//ES6 equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from the TechClub Website",
  });
});


app.use((req, res, next) => {
  console.log(`Received a ${req.method} request for ${req.url}`);
  next();
});


app.use("/api", eventRoutes);

const PORT = process.env.LOCAL_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
