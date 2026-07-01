import { Router } from "express";
import {
  addApplication,
  getAllApplications,
  getApplication,
  removeApplication,
} from "../controllers/application.controller";

const router = Router();

router.post("/applications", addApplication);
router.get("/applications", getAllApplications);
router.get("/applications/:id", getApplication);
router.delete("/applications/:id", removeApplication);

export default router;
