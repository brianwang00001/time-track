import React, { useState } from "react";
import { useData } from "../../context/GlobalContext";
import "../../styles/App.css";
import "../../styles/Button.css";
import "../../styles/Page.css";
import { getEventNames } from "../../utils/DataUtils";

const makeNameReplacements = (data) => {
  const eventNames = getEventNames(data);
  return eventNames.map((name) => ({ original: name, new: name }));
};

const RenamePage = () => {
  const { data, setData } = useData();
  const [nameReplacements, setNameReplacements] = useState(
    makeNameReplacements(data)
  );

  const handleNameChange = (index, newName) => {
    const newNameReplacement = [...nameReplacements];
    newNameReplacement[index] = { ...newNameReplacement[index], new: newName };
    setNameReplacements(newNameReplacement);
  };

  const handleSave = () => {
    const newData = data.map((item) => ({
      ...item,
      summary: nameReplacements.find((name) => name.original === item.summary)
        .new,
    }));
    setData(newData);
    setNameReplacements(makeNameReplacements(newData));
  };

  const getUpdatedData = () => {
    return data.map((item) => ({
      ...item,
      summary: nameReplacements.find((name) => name.original === item.summary)
        .new,
    }));
  };

  return (
    <div className="App-header">
      <div className="event-list">
        <div className="event-header">
          <span>Original Name</span>
          <span>New Name</span>
        </div>
        {nameReplacements.map((item, index) => (
          <div key={index} className="event-row">
            <span className="original-name">{item.original}</span>
            <input
              type="text"
              value={item.new}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="event-input"
              placeholder="Enter new name"
            />
          </div>
        ))}
      </div>
      <div className="button-group">
        <button onClick={handleSave} className="button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default RenamePage;
