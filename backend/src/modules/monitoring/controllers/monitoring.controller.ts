import { Request, Response } from "express";
import { getMonitoringMetrics } from "../services/monitoring.service";

export const getMetrics = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const metrics = await getMonitoringMetrics();

  res.status(200).json({
    status: "success",
    data: metrics,
  });
};