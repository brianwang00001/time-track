import React, { useState } from "react";
import { useData } from "../../context/GlobalContext";
import { getSummaryHours } from "../../utils/DataUtils";
import ChartComponent from "../../components/Chart/Chart";
import MultiSelect from "../../components/MultiSelect/MultiSelect";

const ChartPage = () => {
  const { data } = useData();
  const summaryHoursData = getSummaryHours(data);
  const [selectedSummaries, setSelectedSummaries] = useState(
    summaryHoursData.map((item) => item.summary)
  );

  const summaries = summaryHoursData.map((item) => item.summary);
  const filteredData = summaryHoursData.filter((item) =>
    selectedSummaries.includes(item.summary)
  );

  const handleSelectionChange = (selected) => {
    setSelectedSummaries(selected);
  };

  return (
    <div className="App">
      <div style={{ marginBottom: '20px' }}>
        <MultiSelect
          options={summaries}
          placeholder="Select events"
          onChange={handleSelectionChange}
          value={selectedSummaries}
        />
      </div>
      <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <ChartComponent data={filteredData} />
      </div>
    </div>
  );
};

export default ChartPage;