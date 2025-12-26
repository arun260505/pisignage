import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnterCodePage from "./pages/EnterCodePage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/client.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterCodePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
