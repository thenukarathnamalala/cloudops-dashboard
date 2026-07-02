import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";

export const getSummary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const summary = await getDashboardSummary();

    res.status(200).json({
      status: "success",
      data: summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Failed to load dashboard summary",
    });
  }
};