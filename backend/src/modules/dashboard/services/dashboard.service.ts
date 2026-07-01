import { DashboardSummary } from "../models/dashboard.model";

import { getApplications } from "../../applications/services/application.service";
import { getDeployments } from "../../deployments/services/deployment.service";
import { getMonitoringMetrics } from "../../monitoring/services/monitoring.service";

export const getDashboardSummary = (): DashboardSummary => {
  const applications = getApplications();
  const deployments = getDeployments();
  const monitoring = getMonitoringMetrics();

  return {
    totalApplications: applications.length,
    totalDeployments: deployments.length,
    cpuUsage: monitoring.cpuUsage,
    memoryUsage: monitoring.memoryUsage,
    healthyServices: monitoring.healthyServices,
    runningPods: monitoring.runningPods,
  };
};