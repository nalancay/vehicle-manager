import ReactDOM from "react-dom/client";
import AppLayout from "./components/AppLayout";
import "./index.css";
import "./leaflet-config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppLayout />);
