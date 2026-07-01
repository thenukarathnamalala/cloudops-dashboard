import axios from "axios";
import type { Deployment } from "../types/deployment";

const API_URL = "http://localhost:5000/api";

export const getDeployments = async (): Promise<Deployment[]> => {
  const response = await axios.get(`${API_URL}/deployments`);
  return response.data.data;
};

export const getDeploymentById = async (
  id: string
): Promise<Deployment> => {
  const response = await axios.get(`${API_URL}/deployments/${id}`);
  return response.data.data;
};

export const createDeployment = async (
  deployment: Omit<Deployment, "id" | "createdAt">
): Promise<Deployment> => {
  const response = await axios.post(`${API_URL}/deployments`, deployment);
  return response.data.data;
};

export const deleteDeployment = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/deployments/${id}`);
};