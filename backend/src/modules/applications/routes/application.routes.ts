import { Router } from "express";
import { getAllApplications } from "../controllers/application.controller";

const router = Router();

router.get("/applications", getAllApplications);

export default router;