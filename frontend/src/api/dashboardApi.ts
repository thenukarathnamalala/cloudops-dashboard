import axios from "axios";

const API_URL = "http://localhost:5000/api";

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