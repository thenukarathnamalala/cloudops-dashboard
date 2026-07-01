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
import { createApplication } from "../api/applicationApi";

type Environment = "development" | "staging" | "production";
type Status = "healthy" | "warning" | "critical";

interface AddApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  environment: Environment;
  status: Status;
  version: string;
  owner: string;
}

const initialFormData: FormData = {
  name: "",
  description: "",
  environment: "development",
  status: "healthy",
  version: "",
  owner: "",
};

function AddApplicationDialog({
  open,
  onClose,
  onSuccess,
}: AddApplicationDialogProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await createApplication(formData);

    setFormData(initialFormData);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Application</DialogTitle>

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
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
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
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="healthy">Healthy</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="critical">Critical</MenuItem>
        </TextField>

        <TextField
          label="Version"
          name="version"
          value={formData.version}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Owner"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Create Application
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddApplicationDialog;