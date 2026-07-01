export interface DashboardSummary {
  totalApplications: number;
  totalDeployments: number;
  cpuUsage: number;
  memoryUsage: number;
  healthyServices: number;
  runningPods: number;
}