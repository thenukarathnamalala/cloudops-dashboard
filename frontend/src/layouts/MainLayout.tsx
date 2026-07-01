import type { ReactNode } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const drawerWidth = 260;

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: "72px",
          p: 4,
          backgroundColor: "#f8fafc",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default MainLayout;