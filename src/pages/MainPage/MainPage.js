import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ChartPage from "../ChartPage/ChartPage";
import { useData } from "../../context/GlobalContext";
import { ROOT, CHART, RENAME, REMOVE } from "../../App";
import RenamePage from "../RenamePage/RenamePage";
import RemovePage from "../RemovePage/RemovePage";

const MainPage = () => {
  const { data } = useData();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!data || data.length === 0) {
      navigate(ROOT);
    }
  }, [data, navigate]);

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path={CHART} element={<ChartPage />} />
          <Route path={RENAME} element={<RenamePage />} />
          <Route path={REMOVE} element={<RemovePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
