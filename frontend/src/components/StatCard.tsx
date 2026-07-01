import type { ReactNode } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
              {value}
            </Typography>
          </Box>

          <Box sx={{ color: "#2563eb" }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;