import prisma from "../../../config/prisma";
import { CreateApplicationInput } from "../models/application.model";

export const getApplications = async () => {
  return await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getApplicationById = async (id: string) => {
  return await prisma.application.findUnique({
    where: {
      id,
    },
  });
};

export const createApplication = async (input: CreateApplicationInput) => {
  return await prisma.application.create({
    data: {
      name: input.name,
      description: input.description,
      environment: input.environment,
      status: input.status,
      version: input.version,
      owner: input.owner,
    },
  });
};

export const deleteApplication = async (id: string) => {
  try {
    await prisma.application.delete({
      where: {
        id,
      },
    });

    return true;
  } catch {
    return false;
  }
};