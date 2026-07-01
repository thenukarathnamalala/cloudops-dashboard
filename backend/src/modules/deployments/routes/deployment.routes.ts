import { Router } from "express";
import {
  addDeployment,
  getAllDeployments,
  getDeployment,
  removeDeployment,
} from "../controllers/deployment.controller";

const router = Router();

router.get("/", getAllDeployments);
router.get("/:id", getDeployment);
router.post("/", addDeployment);
router.delete("/:id", removeDeployment);

export default router;