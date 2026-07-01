import { Request, Response } from "express";
import {
  createDeployment,
  deleteDeployment,
  getDeploymentById,
  getDeployments,
} from "../services/deployment.service";

export const getAllDeployments = (
  _req: Request,
  res: Response
): void => {
  const deployments = getDeployments();

  res.status(200).json({
    status: "success",
    data: deployments,
  });
};

export const getDeployment = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const deployment = getDeploymentById(req.params.id);

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

export const addDeployment = (
  req: Request,
  res: Response
): void => {
  const deployment = createDeployment(req.body);

  res.status(201).json({
    status: "success",
    message: "Deployment created successfully",
    data: deployment,
  });
};

export const removeDeployment = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const deleted = deleteDeployment(req.params.id);

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