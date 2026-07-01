import { Application, CreateApplicationInput } from "../models/application.model";

const applications: Application[] = [
  {
    id: "1",
    name: "CloudOps API",
    description: "Backend API service",
    environment: "production",
    status: "healthy",
    version: "1.0.0",
    owner: "Thenuka",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getApplications = (): Application[] => {
  return applications;
};

export const getApplicationById = (id: string): Application | undefined => {
  return applications.find((application) => application.id === id);
};

export const createApplication = (input: CreateApplicationInput): Application => {
  const now = new Date().toISOString();

  const newApplication: Application = {
    id: String(applications.length + 1),
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  applications.push(newApplication);

  return newApplication;
};

export const deleteApplication = (id: string): boolean => {
  const applicationIndex = applications.findIndex((application) => application.id === id);

  if (applicationIndex === -1) {
    return false;
  }

  applications.splice(applicationIndex, 1);

  return true;
};
