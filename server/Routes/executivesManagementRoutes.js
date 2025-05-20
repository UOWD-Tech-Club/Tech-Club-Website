import express from "express";
import {
  inviteExecutive,
  getAllExecutives,
  updateExecutiveRole,
  getExecutive,
  deleteExecutive,
} from "../Controllers/executivesManagement.js";

const router = express.Router();

// router.post("/executives/invite", inviteExecutive);
router.get("/executives", getAllExecutives);
router.get("/executives/:executiveID", getExecutive);
// router.put("/executives/:executiveID", updateExecutiveRole);
router.delete("/executives/:executiveID", deleteExecutive);

export default router;
