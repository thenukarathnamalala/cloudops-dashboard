import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RestoreIcon from "@mui/icons-material/Restore";

import { getDeployments } from "../api/deploymentApi";
import type { Deployment } from "../types/deployment";

function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeployments = () => {
    setLoading(true);

    getDeployments()
      .then(setDeployments)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDeployments();
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Deployments
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadDeployments}
          >
            Refresh
          </Button>

          <Button variant="contained" startIcon={<AddIcon />}>
            New Deployment
          </Button>
        </Box>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Environment</TableCell>
                <TableCell>Replicas</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {deployments.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell>{deployment.applicationName}</TableCell>
                  <TableCell>{deployment.version}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {deployment.environment}
                  </TableCell>
                  <TableCell>{deployment.replicas}</TableCell>
                  <TableCell>
                    <Chip
                      label={deployment.status}
                      color={
                        deployment.status === "running"
                          ? "success"
                          : deployment.status === "pending"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                      >
                        View
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<RestartAltIcon />}
                      >
                        Restart
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<RestoreIcon />}
                      >
                        Rollback
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default DeploymentsPage;