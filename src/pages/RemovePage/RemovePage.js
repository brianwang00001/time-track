import React, { useState } from "react";
import { useData } from "../../context/GlobalContext";
import "../../styles/App.css";
import "../../styles/Button.css";
import "../../styles/Page.css";

const makeNameKeepers = (data) => {
  return data.reduce((acc, event) => ({ ...acc, [event.summary]: true }), {});
};

const RemovePage = () => {
  const { data, setData } = useData();
  const [selectedEvents, setSelectedEvents] = useState(makeNameKeepers(data));

  const toggleEvent = (name) => {
    setSelectedEvents((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSave = () => {
    const updatedData = data.filter((event) => selectedEvents[event.summary]);
    setData(updatedData);
    setSelectedEvents(makeNameKeepers(updatedData));
  };

  return (
    <div className="remove-page">
      <div className="event-list">
        <div className="event-buttons">
          {Object.entries(selectedEvents).map(([name, isSelected]) => (
            <button
              key={name}
              onClick={() => toggleEvent(name)}
              className={`event-button ${isSelected ? "selected" : "removed"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="button-group">
        <button onClick={handleSave} className="button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default RemovePage;
