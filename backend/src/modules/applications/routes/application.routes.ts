import { Router } from "express";
import {
  getAllApplications,
  getApplication,
} from "../controllers/application.controller";

const router = Router();

router.get("/applications", getAllApplications);
router.get("/applications/:id", getApplication);

export default router;