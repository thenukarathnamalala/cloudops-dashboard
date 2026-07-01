import { Router } from "express";
import {
  addApplication,
  getAllApplications,
  getApplication,
} from "../controllers/application.controller";

const router = Router();

router.post("/applications", addApplication);
router.get("/applications", getAllApplications);
router.get("/applications/:id", getApplication);

export default router;
