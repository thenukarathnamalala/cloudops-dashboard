import { Router } from "express";
import { getMetrics } from "../controllers/monitoring.controller";

const router = Router();

router.get("/monitoring/metrics", getMetrics);

export default router;