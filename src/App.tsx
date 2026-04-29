import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";
import InputPage from "./pages/InputPage";
import AnalyzePage from "./pages/AnalyzePage";
import ConvertPage from "./pages/ConvertPage";
import UploadPage from "./pages/UploadPage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = listen<string>("navigate", (event) => {
      navigate(event.payload);
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/convert" element={<ConvertPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
