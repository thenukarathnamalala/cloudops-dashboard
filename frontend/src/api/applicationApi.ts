import axios from "axios";
import type { Application } from "../types/application";

const API_URL = "/api";

export const getApplications = async (): Promise<Application[]> => {
  const response = await axios.get(`${API_URL}/applications`);
  return response.data.data;
};

export const getApplicationById = async (
  id: string
): Promise<Application> => {
  const response = await axios.get(`${API_URL}/applications/${id}`);
  return response.data.data;
};

export const createApplication = async (
  application: Omit<Application, "id" | "createdAt" | "updatedAt">
): Promise<Application> => {
  const response = await axios.post(`${API_URL}/applications`, application);
  return response.data.data;
};

export const deleteApplication = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/applications/${id}`);
};