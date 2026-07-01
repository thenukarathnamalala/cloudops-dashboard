import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      sx={{
        width: "100%",
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
      >
      <Toolbar
        sx={{
          minHeight: "72px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            CloudOps
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              mt: 0.2,
            }}
          >
            DevOps Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <Badge color="error" variant="dot">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#2563eb",
                fontWeight: 700,
              }}
            >
              T
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;