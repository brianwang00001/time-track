import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROOT, CHART, RENAME, REMOVE } from "../../App";
import "./Navbar.css";
import { useData } from "../../context/GlobalContext";
import { handleExportICS } from "../../utils/IcsUtils";
import Clock from "../Clock/Clock";

const Navbar = () => {
  const { data, setData } = useData();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.endsWith(path) ? "active" : "";
  };

  const handleExport = async () => {
    await handleExportICS(data, "my_calendar.ics");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={ROOT} className="navbar-logo-container">
          <Clock size="1.5em" />
          <div className="navbar-logo">Time Track</div>
        </Link>

        <div className="navbar-links">
          <Link
            to={`${ROOT}/${CHART}`}
            className={`navbar-link ${isActive(CHART)}`}
          >
            Chart
          </Link>
          <Link
            to={`${ROOT}/${RENAME}`}
            className={`navbar-link ${isActive(RENAME)}`}
          >
            Rename
          </Link>
          <Link
            to={`${ROOT}/${REMOVE}`}
            className={`navbar-link ${isActive(REMOVE)}`}
          >
            Remove
          </Link>

          <Link to="#" onClick={handleExport} className="navbar-link">
            Export
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
