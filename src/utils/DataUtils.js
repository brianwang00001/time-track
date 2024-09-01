export const calcuateHours = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffInMilliseconds = end - start;
  const diffInHours = diffInMilliseconds / 1000 / 60 / 60;
  return parseFloat(diffInHours.toFixed(2));
};

export const appendHoursToData = (data) => {
  return data.map((item) => ({
    ...item,
    hours: calcuateHours(item.startDate, item.endDate),
  }));
};

export const groupData = (data) => {
  const groupedData = Object.groupBy(data, (item) => item.summary);
  return groupedData;
};

export const getSummaryHours = (data) => {
  const groupedData = groupData(appendHoursToData(data));

  const summaryHoursData = Object.keys(groupedData).map((summary) => {
    const groupedObject = groupedData[summary];
    const totalHours = groupedObject.reduce((sum, item) => sum + item.hours, 0);
    return {
      summary: summary,
      totalHours: totalHours,
    };
  });
  return summaryHoursData;
};

export const getEventNames = (data) => {
  const groupedData = groupData(data);
  return Object.keys(groupedData);
};
