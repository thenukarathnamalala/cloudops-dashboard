import prisma from "../../../config/prisma";
import { CreateDeploymentInput } from "../models/deployment.model";

export const getDeployments = async () => {
  return await prisma.deployment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getDeploymentById = async (id: string) => {
  return await prisma.deployment.findUnique({
    where: {
      id,
    },
  });
};

export const createDeployment = async (
  input: CreateDeploymentInput
) => {
  return await prisma.deployment.create({
    data: {
      applicationName: input.applicationName,
      version: input.version,
      environment: input.environment,
      replicas: input.replicas,
      status: input.status,
    },
  });
};

export const deleteDeployment = async (id: string) => {
  try {
    await prisma.deployment.delete({
      where: {
        id,
      },
    });

    return true;
  } catch {
    return false;
  }
};