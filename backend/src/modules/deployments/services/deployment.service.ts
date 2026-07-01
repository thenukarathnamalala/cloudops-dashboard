import {
  Deployment,
  CreateDeploymentInput,
} from "../models/deployment.model";

const deployments: Deployment[] = [
  {
    id: "1",
    applicationName: "CloudOps API",
    version: "1.0.0",
    environment: "production",
    replicas: 3,
    status: "running",
    createdAt: new Date().toISOString(),
  },
];

export const getDeployments = (): Deployment[] => deployments;

export const getDeploymentById = (
  id: string
): Deployment | undefined =>
  deployments.find((deployment) => deployment.id === id);

export const createDeployment = (
  input: CreateDeploymentInput
): Deployment => {
  const deployment: Deployment = {
    id: String(deployments.length + 1),
    createdAt: new Date().toISOString(),
    ...input,
  };

  deployments.push(deployment);

  return deployment;
};

export const deleteDeployment = (id: string): boolean => {
  const index = deployments.findIndex(
    (deployment) => deployment.id === id
  );

  if (index === -1) return false;

  deployments.splice(index, 1);

  return true;
};