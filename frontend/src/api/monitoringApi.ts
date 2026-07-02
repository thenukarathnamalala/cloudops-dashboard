import axios from "axios";

const API_URL = "/api";

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