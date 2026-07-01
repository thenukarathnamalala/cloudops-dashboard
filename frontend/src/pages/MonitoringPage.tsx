import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
  getMonitoringMetrics,
  type MonitoringMetrics,
} from "../api/monitoringApi";

function MonitoringPage() {
  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMetrics = () => {
    setLoading(true);

    getMonitoringMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!metrics) {
    return (
      <Typography color="error">
        Failed to load monitoring metrics.
      </Typography>
    );
  }

  const cards = [
    {
      title: "CPU Usage",
      value: `${metrics.cpuUsage}%`,
    },
    {
      title: "Memory Usage",
      value: `${metrics.memoryUsage}%`,
    },
    {
      title: "Running Pods",
      value: metrics.runningPods,
    },
    {
      title: "Healthy Services",
      value: metrics.healthyServices,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Monitoring
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadMetrics}
          >
            Refresh Metrics
          </Button>

          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            disabled
          >
            View Grafana
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 700,
                }}
              >
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MonitoringPage;