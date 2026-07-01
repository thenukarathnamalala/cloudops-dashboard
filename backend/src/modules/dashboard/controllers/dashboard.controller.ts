import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";

export const getSummary = (_req: Request, res: Response): void => {
  const summary = getDashboardSummary();

  res.status(200).json({
    status: "success",
    data: summary,
  });
};