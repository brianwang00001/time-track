import React, { useState, useRef, useEffect } from "react";
import "./MultiSelect.css";

const MultiSelect = ({ options, placeholder = "Select item(s)", onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...options]);
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  // ???
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div
        className={`multi-select-header ${
          isOpen ? "multi-select-header-active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          <span className="multi-select-header-option">
            {selectedOptions.length} selected
          </span>
        ) : (
          <span className="multi-select-header-placeholder">{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <div className="multi-select-options">
          <input
            type="text"
            className="multi-select-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div
            className={`multi-select-all ${
              selectedOptions.length === options.length
                ? "multi-select-selected"
                : ""
            }`}
            onClick={handleSelectAll}
          >
            <span className="multi-select-option-radio"></span>
            <span className="multi-select-option-text">Select all</span>
          </div>
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className={`multi-select-option ${
                selectedOptions.includes(option) ? "multi-select-selected" : ""
              }`}
              onClick={() => toggleOption(option)}
            >
              <span className="multi-select-option-radio"></span>
              <span className="multi-select-option-text">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
