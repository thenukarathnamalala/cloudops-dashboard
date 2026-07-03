import axios from "axios";

const PROMETHEUS_URL =
  process.env.PROMETHEUS_URL || "http://localhost:9090";

const queryPrometheus = async (query: string): Promise<number> => {
  const response = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
    params: { query },
  });

  const result = response.data.data.result;

  if (!result || result.length === 0) {
    return 0;
  }

  return Number(result[0].value[1]);
};

export const getMonitoringMetrics = async () => {
  const cpuUsage = await queryPrometheus(
    `100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)`
  );

  const memoryUsage = await queryPrometheus(
    `100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))`
  );

  const runningPods = await queryPrometheus(
    `count(kube_pod_status_phase{phase="Running"})`
  );

  const healthyServices = await queryPrometheus(`count(up == 1)`);

  return {
    cpuUsage: Math.round(cpuUsage),
    memoryUsage: Math.round(memoryUsage),
    healthyServices: Math.round(healthyServices),
    runningPods: Math.round(runningPods),
  };
};