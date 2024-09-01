import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/GlobalContext";
import { ROOT, CHART } from "../../App";
import "../../styles/App.css";
import "../../styles/Button.css";
import Clock from "../../components/Clock/Clock";
import { parseICal } from "../../utils/IcsUtils";

const UploadPage = () => {
  const { setData } = useData();
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target.result;
          const parsedEvents = parseICal(fileContent);
          setData(parsedEvents);
          navigate(`${ROOT}/${CHART}`); 
        } catch (error) {
          console.error("Error parsing ICS file:", error);
          alert(
            "Error parsing ICS file. Please make sure it's a valid ICS format."
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Clock size={200} />
        <h1>Time Track</h1>
        <div className="button-container">
          <label htmlFor="file-upload" className="button">
            Upload Calendar (.ics)
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".ics"
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>
      </header>
    </div>
  );
};

export default UploadPage;
