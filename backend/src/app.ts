import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./modules/health/routes/health.routes";
import applicationRoutes from "./modules/applications/routes/application.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import deploymentRoutes from "./modules/deployments/routes/deployment.routes";
import monitoringRoutes from "./modules/monitoring/routes/monitoring.routes";
import dashboardRoutes from "./modules/dashboard/routes/dashboard.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", healthRoutes);
app.use("/api", applicationRoutes);
app.use("/api/deployments", deploymentRoutes);
app.use("/api", monitoringRoutes);
app.use("/api", dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
