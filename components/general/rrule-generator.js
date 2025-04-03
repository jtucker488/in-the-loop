export default function generateRRule({
    repeat,
    repeat_frequency,
    repeat_length_of_time,
    days_to_repeat,
    ends_on,
    ends_on_date,
    ends_after_occurances
,
  }) {
    console.log(
      "repeat",
      repeat,
      "repeat_frequency",
      repeat_frequency,
      "repeat_length_of_time",
      repeat_length_of_time,
      "days_to_repeat",
      days_to_repeat,
      "ends_on",
      ends_on,
      "ends_on_date",
      ends_on_date,
      "ends_after_occurances",
      ends_after_occurances

    );
  
    let rrule = `RRULE:`;
  
    // Predefined repeat options
    switch (repeat) {
      case "Does not repeat":
        return null;
      case "Daily":
        return "RRULE:FREQ=DAILY";
      case "Every weekday":
        return "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR";
      default:
        if (String(repeat).startsWith("Weekly on")) {
          const dayName = repeat.split("Weekly on ")[1];
          const dayAbbreviations = {
            Sunday: "SU",
            Monday: "MO",
            Tuesday: "TU",
            Wednesday: "WE",
            Thursday: "TH",
            Friday: "FR",
            Saturday: "SA",
          };
          const dayAbbreviation = dayAbbreviations[dayName];
          if (!dayAbbreviation) {
            console.error(`Invalid day name in repeat: ${dayName}`);
            return null;
          }
          return `RRULE:FREQ=WEEKLY;BYDAY=${dayAbbreviation}`;
        }
        break;
    }
  
    // Set FREQ based on repeat_length_of_time
    switch (repeat_length_of_time) {
      case "Day":
        rrule += `FREQ=DAILY;`;
        break;
      case "Week":
        rrule += `FREQ=WEEKLY;`;
        break;
      case "Month":
        rrule += `FREQ=MONTHLY;`;
        break;
      case "Year":
        rrule += `FREQ=YEARLY;`;
        break;
      default:
        break;
    }
  
    // Set INTERVAL if repeat_frequency > 1
    if (repeat_frequency && repeat_frequency > 1) {
      rrule += `INTERVAL=${repeat_frequency};`;
    }
  
    // Set BYDAY for weekly repetition
    if (
      repeat_length_of_time === "Week" &&
      days_to_repeat &&
      days_to_repeat.length > 0
    ) {
      const dayAbbreviations = {
        sunday: "SU",
        monday: "MO",
        tuesday: "TU",
        wednesday: "WE",
        thursday: "TH",
        friday: "FR",
        saturday: "SA",
      };
  
      // Map days to abbreviations and filter invalid values
      const byDay = days_to_repeat
        .map((day) => dayAbbreviations[day])
        .filter(Boolean) // Remove invalid or undefined entries
        .join(",");
      if (byDay) {
        rrule += `BYDAY=${byDay};`;
      } else {
        console.error("No valid days to repeat were found.");
      }
    } else if (repeat_length_of_time === "Week" && !days_to_repeat) {
      console.error("days_to_repeat is missing or empty for weekly repetition.");
    }
  
    // Handle Ends On
    if (ends_on === "on" && ends_on_date) {
      rrule += `UNTIL=${
        new Date(ends_on_date).toISOString().replace(/[-:]/g, "").split(".")[0]
      }Z;`;
    } else if (ends_on === "after" && ends_after_occurances) {
      rrule += `COUNT=${ends_after_occurances};`;
    }
  
    // Remove trailing semicolon
    rrule = rrule.endsWith(";") ? rrule.slice(0, -1) : rrule;
  
    console.log("Generated RRULE:", rrule);
    return rrule;
  }