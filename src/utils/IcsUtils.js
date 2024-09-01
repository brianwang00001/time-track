import ICAL from "ical.js";

export const parseICal = (data) => {
  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  return vevents.map((event) => {
    const vevent = new ICAL.Event(event);
    return {
      summary: vevent.summary,
      startDate: vevent.startDate.toString(),
      endDate: vevent.endDate.toString(),
      location: vevent.location,
    };
  });
};

export const generateICS = (data) => {
  const calendar = new ICAL.Component(["vcalendar", [], []]);

  calendar.updatePropertyWithValue("prodid", "-//Time Track App//EN");
  calendar.updatePropertyWithValue("version", "2.0");

  data.forEach((event) => {
    const vevent = new ICAL.Component("vevent");
    const eventProp = new ICAL.Event(vevent);

    eventProp.summary = event.summary;
    eventProp.startDate = ICAL.Time.fromString(event.startDate);
    eventProp.endDate = ICAL.Time.fromString(event.endDate);

    if (event.location) {
      eventProp.location = event.location;
    }

    calendar.addSubcomponent(vevent);
  });

  return calendar.toString();
};

const fallbackSaveFile = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const handleExportICS = async (data) => {
  const icsContent = generateICS(data);
  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });

  if ("showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "exported_calendar.ics",
        types: [
          {
            description: "iCalendar File",
            accept: { "text/calendar": [".ics"] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to save file:", err);
        alert("Failed to save file. Falling back to default download method.");
        fallbackSaveFile(blob, "exported_calendar.ics");
      }
    }
  } else {
    fallbackSaveFile(blob, "exported_calendar.ics");
  }
};
