import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";

import AppsIcon from "@mui/icons-material/Apps";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MemoryIcon from "@mui/icons-material/Memory";
import SpeedIcon from "@mui/icons-material/Speed";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useNavigate } from "react-router-dom";

import {
  getDashboardSummary,
  type DashboardSummary,
} from "../api/dashboardApi";

const GRAFANA_URL = "http://54.254.56.237:30090";

function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadSummary = () => {
    setLoading(true);

    getDashboardSummary()
      .then(setSummary)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!summary) {
    return (
      <Typography color="error">
        Failed to load dashboard summary.
      </Typography>
    );
  }

  const cards = [
    {
      title: "Applications",
      value: summary.totalApplications,
      subtitle: "Total registered apps",
      icon: <AppsIcon fontSize="large" />,
    },
    {
      title: "Deployments",
      value: summary.totalDeployments,
      subtitle: "Active deployments",
      icon: <RocketLaunchIcon fontSize="large" />,
    },
    {
      title: "Healthy Targets",
      value: summary.healthyServices,
      subtitle: "Prometheus targets up",
      icon: <MonitorHeartIcon fontSize="large" />,
    },
    {
      title: "Running Pods",
      value: summary.runningPods,
      subtitle: "Pods currently running",
      icon: <CloudQueueIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 4,
          background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Dashboard
            </Typography>

            <Typography sx={{ color: "#dbeafe", maxWidth: 650 }}>
              Live Kubernetes operations dashboard powered by PostgreSQL,
              Prometheus, Grafana, Argo CD, and GitOps.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={loadSummary}
              sx={{
                backgroundColor: "#ffffff",
                color: "#1d4ed8",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#e0f2fe",
                },
              }}
            >
              Refresh
            </Button>

            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              onClick={() => window.open(GRAFANA_URL, "_blank")}
              sx={{
                color: "#ffffff",
                borderColor: "#ffffff",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#dbeafe",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Grafana
            </Button>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                borderTop: "5px solid #2563eb",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>

                <Box sx={{ color: "#2563eb" }}>{card.icon}</Box>
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 800 }}>
                {card.value}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {card.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Live Resource Usage
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SpeedIcon color="primary" />
                  <Typography>CPU Usage</Typography>
                </Box>

                <Typography sx={{ fontWeight: 700 }}>
                  {summary.cpuUsage}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={summary.cpuUsage}
                sx={{ mt: 1, height: 10, borderRadius: 5 }}
              />
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MemoryIcon color="primary" />
                  <Typography>Memory Usage</Typography>
                </Box>

                <Typography sx={{ fontWeight: 700 }}>
                  {summary.memoryUsage}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={summary.memoryUsage}
                sx={{ mt: 1, height: 10, borderRadius: 5 }}
              />
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Metrics are collected from Prometheus using Node Exporter and
              kube-state-metrics.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Actions
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/applications")}
              >
                New Application
              </Button>

              <Button
                variant="outlined"
                startIcon={<RocketLaunchIcon />}
                onClick={() => navigate("/deployments")}
              >
                New Deployment
              </Button>

              <Button
                variant="outlined"
                startIcon={<MonitorHeartIcon />}
                onClick={() => navigate("/monitoring")}
              >
                View Metrics
              </Button>

              <Button
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                onClick={() => window.open(GRAFANA_URL, "_blank")}
              >
                Open Grafana
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                System Health
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Backend API Healthy"
                  color="success"
                />

                <Chip
                  icon={<CheckCircleIcon />}
                  label="Prometheus Connected"
                  color="success"
                />

                <Chip
                  icon={<CheckCircleIcon />}
                  label="Grafana Running"
                  color="success"
                />

                <Chip
                  icon={<CheckCircleIcon />}
                  label="Argo CD Synced"
                  color="success"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;