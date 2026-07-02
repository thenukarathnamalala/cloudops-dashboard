import { Request, Response } from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  deleteApplication,
} from "../services/application.service";

export const getAllApplications = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const applications = await getApplications();

  res.status(200).json({
    status: "success",
    data: applications,
  });
};

export const getApplication = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const application = await getApplicationById(req.params.id);

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

export const addApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Request Body:", req.body);

    const application = await createApplication(req.body);

    res.status(201).json({
      status: "success",
      message: "Application created successfully",
      data: application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const removeApplication = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const deleted = await deleteApplication(req.params.id);

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