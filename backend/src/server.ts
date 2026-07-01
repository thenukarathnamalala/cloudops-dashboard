import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`CloudOps Dashboard API running on port ${env.PORT}`);
});
