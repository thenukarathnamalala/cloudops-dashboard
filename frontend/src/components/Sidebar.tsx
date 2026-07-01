import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const drawerWidth = 260;

function Sidebar() {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Applications", icon: <AppsIcon /> },
    { text: "Deployments", icon: <RocketLaunchIcon /> },
    { text: "Monitoring", icon: <MonitorHeartIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0f172a",
          color: "#ffffff",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          CloudOps
        </Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8", mt: 0.5 }}>
          DevOps Dashboard
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#1e293b" }} />

      <List sx={{ px: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: "#cbd5e1",
              "&:hover": {
                backgroundColor: "#1e293b",
                color: "#ffffff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;