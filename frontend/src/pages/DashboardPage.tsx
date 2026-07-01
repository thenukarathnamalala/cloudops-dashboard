import { Box, Typography } from "@mui/material";

function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary">
        Welcome to CloudOps Dashboard
      </Typography>
    </Box>
  );
}

export default DashboardPage;