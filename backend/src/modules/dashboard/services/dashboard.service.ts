import prisma from "../../../config/prisma";

import { DashboardSummary } from "../models/dashboard.model";
import { getMonitoringMetrics } from "../../monitoring/services/monitoring.service";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const monitoring = getMonitoringMetrics();

  const totalApplications = await prisma.application.count();

  const totalDeployments = await prisma.deployment.count();

  const healthyServices = await prisma.application.count({
    where: {
      status: "healthy",
    },
  });

  return {
    totalApplications,
    totalDeployments,
    cpuUsage: monitoring.cpuUsage,
    memoryUsage: monitoring.memoryUsage,
    healthyServices,
    runningPods: monitoring.runningPods,
  };
};