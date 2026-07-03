import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";

export const getSummary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const summary = await getDashboardSummary();

  res.status(200).json({
    status: "success",
    data: summary,
  });
};