import { Request, Response } from "express";
import {
  createDeployment,
  deleteDeployment,
  getDeploymentById,
  getDeployments,
} from "../services/deployment.service";

export const getAllDeployments = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const deployments = await getDeployments();

  res.status(200).json({
    status: "success",
    data: deployments,
  });
};

export const getDeployment = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const deployment = await getDeploymentById(req.params.id);

  if (!deployment) {
    res.status(404).json({
      status: "error",
      message: "Deployment not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: deployment,
  });
};

export const addDeployment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Request Body:", req.body);

    const deployment = await createDeployment(req.body);

    res.status(201).json({
      status: "success",
      message: "Deployment created successfully",
      data: deployment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const removeDeployment = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const deleted = await deleteDeployment(req.params.id);

  if (!deleted) {
    res.status(404).json({
      status: "error",
      message: "Deployment not found",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Deployment deleted successfully",
  });
};