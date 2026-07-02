import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { createDeployment } from "../api/deploymentApi";


type Environment = "development" | "staging" | "production";
type Status = "running" | "deploying" | "failed";

interface AddDeploymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  applicationName: string;
  version: string;
  environment: Environment;
  replicas: number;
  status: Status;
}

const initialFormData: FormData = {
  applicationName: "",
  version: "",
  environment: "development",
  replicas: 1,
  status: "running",
};

function AddDeploymentDialog({
  open,
  onClose,
  onSuccess,
}: AddDeploymentDialogProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "replicas" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await createDeployment(formData);

    setFormData(initialFormData);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Deployment</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        <TextField
          label="Application Name"
          name="applicationName"
          value={formData.applicationName}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Version"
          name="version"
          value={formData.version}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Environment"
          name="environment"
          value={formData.environment}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="development">Development</MenuItem>
          <MenuItem value="staging">Staging</MenuItem>
          <MenuItem value="production">Production</MenuItem>
        </TextField>

        <TextField
          label="Replicas"
          name="replicas"
          type="number"
          value={formData.replicas}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="running">Running</MenuItem>
          <MenuItem value="deploying">Deploying</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Create Deployment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDeploymentDialog;