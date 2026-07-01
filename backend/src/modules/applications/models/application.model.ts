export type ApplicationEnvironment = "development" | "staging" | "production";

export type ApplicationStatus = "healthy" | "warning" | "critical";

export interface Application {
  id: string;
  name: string;
  description: string;
  environment: ApplicationEnvironment;
  status: ApplicationStatus;
  version: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}