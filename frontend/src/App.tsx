import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import DeploymentsPage from "./pages/DeploymentsPage";
import MonitoringPage from "./pages/MonitoringPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/deployments" element={<DeploymentsPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;