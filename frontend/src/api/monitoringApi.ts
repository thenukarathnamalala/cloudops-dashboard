import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface MonitoringMetrics {
  cpuUsage: number;
  memoryUsage: number;
  runningPods: number;
  healthyServices: number;
}

export const getMonitoringMetrics = async (): Promise<MonitoringMetrics> => {
  const response = await axios.get(`${API_URL}/monitoring/metrics`);
  return response.data.data;
};