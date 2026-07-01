import { Request, Response } from "express";
import { getApplications } from "../services/application.service";

export const getAllApplications = (_req: Request, res: Response): void => {
  const applications = getApplications();

  res.status(200).json({
    status: "success",
    data: applications,
  });
};