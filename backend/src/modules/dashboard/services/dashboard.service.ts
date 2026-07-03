import prisma from "../../../config/prisma";
import { getMonitoringMetrics } from "../../monitoring/services/monitoring.service";
import { DashboardSummary } from "../models/dashboard.model";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const monitoring = await getMonitoringMetrics();

  const totalApplications = await prisma.application.count();

  const totalDeployments = await prisma.deployment.count();

  return {
    totalApplications,
    totalDeployments,
    cpuUsage: monitoring.cpuUsage,
    memoryUsage: monitoring.memoryUsage,
    healthyServices: monitoring.healthyServices,
    runningPods: monitoring.runningPods,
  };
};