import { Request, Response } from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
} from "../services/application.service";

export const getAllApplications = (_req: Request, res: Response): void => {
  const applications = getApplications();

  res.status(200).json({
    status: "success",
    data: applications,
  });
};

export const getApplication = (req: Request<{ id: string }>, res: Response): void => {
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

export const addApplication = (req: Request, res: Response): void => {
  const application = createApplication(req.body);

  res.status(201).json({
    status: "success",
    message: "Application created successfully",
    data: application,
  });
};

export const removeApplication = (req: Request<{ id: string }>, res: Response): void => {
  const deleted = deleteApplication(req.params.id);

  if (!deleted) {
    res.status(404).json({
      status: "error",
      message: "Application not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Application deleted successfully",
  });
};
