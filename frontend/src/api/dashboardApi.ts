import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface DashboardSummary {
  totalApplications: number;
  totalDeployments: number;
  cpuUsage: number;
  memoryUsage: number;
  healthyServices: number;
  runningPods: number;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await axios.get(`${API_URL}/dashboard/summary`);
  return response.data.data;
};