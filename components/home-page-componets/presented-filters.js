import { useSelector } from "react-redux";
import PresentedHashtag from "./presented-hashtag";
import PresentedDateRange from "./presented-date-range";
import { format_date } from "../format/format-input";
import dayjs from "dayjs";

function PresentedFilters({hashtags, start_date, end_date }) {
  
  const today_date = dayjs();
  console.log("start_date2", start_date);

  return (
    <div className="mb-2 ml-16 bg-black">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {((start_date !== format_date(today_date) && start_date !== null)|| end_date) && (
          <PresentedDateRange start_date={start_date} end_date={end_date} />
        )}
        {hashtags &&
          hashtags.map((name) => (
            <PresentedHashtag key={name} name={name} />
          ))}
      </div>
    </div>
  );
}

export default PresentedFilters;
