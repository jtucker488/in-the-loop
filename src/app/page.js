import HomePage from "../../components/home-page-componets/home-page";
import axios from "axios";
import dayjs from "dayjs";
import config from "../../config"; // Assuming you have a config file

export default async function CategoriesPage() {
  let today = dayjs().format("YYYY-MM-DD");

  try {
    // Fetch both data sets in parallel using Promise.all
    const [featuredResponse, superFeaturedResponse] = await Promise.all([
      axios.get(
        `${config.api.eventUrl}/events/getEvents?is_featured=true&start_date=${today}`
      ),
      axios.get(
        `${config.api.eventUrl}/events/getEvents?is_super_featured=true&start_date=${today}`
      ),
    ]);

    const featuredData = featuredResponse.data;
    const superFeaturedData = superFeaturedResponse.data;

    const newFeaturedSubcategoryEvents = {};

    // Iterate through each event and categorize them
    featuredData.forEach((event) => {
      const subcategory = event.subcategory_name; // Handle empty categories
      if (subcategory) {
        if (!newFeaturedSubcategoryEvents[subcategory]) {
          newFeaturedSubcategoryEvents[subcategory] = [];
        }
        newFeaturedSubcategoryEvents[subcategory].push(event);
      }
    });

    // Set the categorized events in the state
    const categorizedFeaturedEvents = newFeaturedSubcategoryEvents;

    return (
      <HomePage superFeatured={superFeaturedData} featured={categorizedFeaturedEvents} />
    );
  } catch (err) {
    console.error(`An error has occurred: ${err}`);
    return <p>Error loading data.</p>; // Handle error gracefully
  }
}
