import { Application } from "../models/application.model";

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