import { Router } from "express";
import { getSummary } from "../controllers/dashboard.controller";

const router = Router();

router.get("/dashboard/summary", getSummary);

export default router;