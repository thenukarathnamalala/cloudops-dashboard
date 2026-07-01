import type { ReactNode } from "react";
import { Box } from "@mui/material";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f8fafc",
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            width: "100%",
            boxSizing: "border-box",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;