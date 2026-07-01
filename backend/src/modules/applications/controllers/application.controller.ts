import { Request, Response } from "express";
import {
  getApplications,
  getApplicationById,
} from "../services/application.service";

export const getAllApplications = (_req: Request, res: Response): void => {
  const applications = getApplications();

  res.status(200).json({
    status: "success",
    data: applications,
  });
};

export const getApplication = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const application = getApplicationById(req.params.id);

  if (!application) {
    res.status(404).json({
      status: "error",
      message: "Application not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: application,
  });
};