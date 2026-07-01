export interface Application {
  id: string;
  name: string;
  description: string;
  environment: "development" | "staging" | "production";
  status: "healthy" | "warning" | "critical";
  version: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}