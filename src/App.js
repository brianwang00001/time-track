import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UploadPage from "./pages/UploadPage/UploadPage";
import MainPage from "./pages/MainPage/MainPage";
import { DataProvider } from "./context/GlobalContext";

export const ROOT = "/time-track";
export const CHART = "chart";
export const RENAME = "rename";
export const REMOVE = "remove";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path={ROOT} element={<UploadPage />} />
          <Route path={`${ROOT}/*`} element={<MainPage />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
