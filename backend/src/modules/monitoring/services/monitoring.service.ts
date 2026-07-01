import { MonitoringMetrics } from "../models/monitoring.model";

export const getMonitoringMetrics = (): MonitoringMetrics => {
  return {
    cpuUsage: 45,
    memoryUsage: 61,
    runningPods: 12,
    healthyServices: 8,
  };
};