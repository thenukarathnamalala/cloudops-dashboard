import { Request, Response } from "express";
import { getMonitoringMetrics } from "../services/monitoring.service";

export const getMetrics = (_req: Request, res: Response): void => {
  const metrics = getMonitoringMetrics();

  res.status(200).json({
    status: "success",
    data: metrics,
  });
};