export interface Deployment {
  id: string;
  applicationName: string;
  version: string;
  environment: "development" | "staging" | "production";
  replicas: number;
  status: "running" | "deploying" | "failed";
  createdAt: string;
}