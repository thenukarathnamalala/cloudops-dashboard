export interface Deployment {
  id: string;
  applicationName: string;
  version: string;
  environment: "development" | "staging" | "production";
  replicas: number;
  status: "running" | "pending" | "failed";
  createdAt: string;
}

export type CreateDeploymentInput = Omit<
  Deployment,
  "id" | "createdAt"
>;