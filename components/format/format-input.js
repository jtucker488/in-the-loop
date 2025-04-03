import dayjs from "dayjs";
export const freq_options = [
  { id: 0, name: "Day" },
  { id: 1, name: "Week" },
  { id: 2, name: "Month" },
  { id: 3, name: "Year" },
];

export function isEndDateBeforeStartDate(start_date, end_date) {
  if (start_date && end_date) {
    const start = dayjs(start_date);
    const end = dayjs(end_date);

    // Return true if end_date is before start_date
    return end.isBefore(start);
  }
  return false;
}


export function formatEventDateTime(event) {
  const now = dayjs();
  const startDate = dayjs(event.instance_date);
  const endDate = dayjs(event.instance_end_date);
  const startTime = event.instance_start_time;
  const endTime = event.instance_end_time;

  const isSameDay = startDate.isSame(endDate, "day");

  const formatDate = (date) => {
    if (date.isSame(now, "week")) {
      return date.format("dddd");
    } else if (date.isSame(now, "year")) {
      return date.format("MMM D");
    } else {
      return date.format("MMM D, YYYY");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  };

  const formatDateTime = (date, time) => {
    const dateStr = formatDate(date);
    const timeStr = formatTime(time);
    return timeStr ? `${dateStr} @ ${timeStr}` : dateStr;
  };

  if (isSameDay) {
    const dateStr = formatDate(startDate);
    const startTimeStr = formatTime(startTime);
    const endTimeStr = formatTime(endTime);
    if (startTimeStr === "" && endTimeStr === "") {
      return `${dateStr}`;
    }
    if (startTimeStr === "") {
      return `${dateStr} - ${endTimeStr}`;
    }
    if (endTimeStr === "") {
      return `${dateStr} - ${startTimeStr}`;
    }
    return `${dateStr} ${startTimeStr} - ${endTimeStr}`;
  } else {
    const startStr = formatDateTime(startDate, startTime);
    const endStr = formatDateTime(endDate, endTime);
    return `${startStr} - ${endStr}`;
  }
};

export function isStartBeforeEndWithTime(
  start_date,
  start_time,
  end_date,
  end_time
) {
  if (!!start_date && !!start_time && !!end_date && !!end_time) {
    const startDateTime = dayjs(
      `${start_date} ${start_time}`,
      "MM-DD-YYYY HH:mm"
    );
    const endDateTime = dayjs(`${end_date} ${end_time}`, "MM-DD-YYYY HH:mm");
    // Return true if startDateTime is before endDateTime
    return endDateTime.isBefore(startDateTime) ? "incorrect times" : "";
  }
  if (!!start_date && !!end_date) {
    return isEndDateBeforeStartDate(start_date, end_date)
      ? "incorrect dates"
      : "";
  }

  // If any date or time is missing, return false (invalid comparison)
  return false;
}

export function format_date(date) {
  if (!date) {
    return null;
  }

  const year = date.$y;
  let day = date.$D;
  let month = date.$M + 1;

  if (month < 10) {
    month = "0" + String(month);
  }
  if (day < 10) {
    day = "0" + String(day);
  }

  return `${year}-${month}-${day}`; // Correct order for type="date"
}

export function format_time(date) {
  if (!date) {
    return null;
  }
  let hour = date.$H;
  let minute = date.$m;

  if (hour < 10) {
    hour = "0" + String(hour);
  }
  if (minute < 10) {
    minute = "0" + String(minute);
  }

  return `${hour}:${minute}`;
}
