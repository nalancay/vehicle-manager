import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicleListPage from "../../pages/VehicleListPage";
import VehicleDetailPage from "../../pages/VehicleDetailPage";

function AppLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleListPage />} />
        <Route
          path="/vehicle/:typeCar/:model/:year"
          element={<VehicleDetailPage />}
        />
      </Routes>
    </Router>
  );
}

export default AppLayout;
