import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import AddApplicationDialog from "../components/AddApplicationDialog";
import { deleteApplication, getApplications } from "../api/applicationApi";
import type { Application } from "../types/application";

function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const loadApplications = () => {
    setLoading(true);
    getApplications()
      .then(setApplications)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const openViewDialog = (app: Application) => {
    setSelectedApp(app);
    setViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setSelectedApp(null);
    setViewDialogOpen(false);
  };

  const openDeleteDialog = (app: Application) => {
    setSelectedApp(app);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedApp(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedApp) return;

    await deleteApplication(selectedApp.id);
    closeDeleteDialog();
    loadApplications();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Applications
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={loadApplications}>
            Refresh
          </Button>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
            Add Application
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
                <TableCell>Name</TableCell>
                <TableCell>Environment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>{app.environment}</TableCell>
                  <TableCell>
                    <Chip
                      label={app.status}
                      color={app.status === "healthy" ? "success" : app.status === "warning" ? "warning" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{app.version}</TableCell>
                  <TableCell>{app.owner}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => openViewDialog(app)}
                      >
                        View
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => openDeleteDialog(app)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={viewDialogOpen} onClose={closeViewDialog} fullWidth maxWidth="sm">
        <DialogTitle>Application Details</DialogTitle>

        <DialogContent>
          {selectedApp && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography><strong>Name:</strong> {selectedApp.name}</Typography>
              <Typography><strong>Description:</strong> {selectedApp.description}</Typography>
              <Typography><strong>Environment:</strong> {selectedApp.environment}</Typography>
              <Typography><strong>Status:</strong> {selectedApp.status}</Typography>
              <Typography><strong>Version:</strong> {selectedApp.version}</Typography>
              <Typography><strong>Owner:</strong> {selectedApp.owner}</Typography>

              <Divider sx={{ my: 1 }} />

              <Typography><strong>Created At:</strong> {selectedApp.createdAt}</Typography>
              <Typography><strong>Updated At:</strong> {selectedApp.updatedAt}</Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Application</DialogTitle>

        <DialogContent>
          Are you sure you want to delete <strong>{selectedApp?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AddApplicationDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSuccess={loadApplications}
      />
    </Box>
  );
}

export default ApplicationsPage;