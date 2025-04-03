"use client"
import Carousel from "../../components/home-page-componets/super-featured-cards";
import CardSwipe from "../../components/home-page-componets/card-swipe";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

import { clearFilters, fetchSelectedEvents } from "../../components/redux/slices/searchResultsSlice";

const slides = [
  "./images/event2.jpg",
  "./images/event3.jpg",
  "./images/event4.jpg",
];

export default function CategoriesPage() {
  const router = useRouter(); // Initialize the router

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(clearFilters());
      await dispatch(fetchSelectedEvents({ is_featured: true, pagination: false }));
    };

    fetchData();
  }, [dispatch]); // Don't forget to include dispatch in the dependency array

  const featuredCategorizedEvents = useSelector(
    (state) => state.searchResults.featuredCategorizedEvents
  );
  
  const handleCategoryClick = (category) => {
    console.log("category", category);
    router.push(`/${category}`); // Navigate to the dynamic route
  };
  return (
    <div className="flex flex-col items-center">
      <div className="px-8 rounded">
        <Carousel autoSlide={true}>
          {slides.map((s, index) => (
            <img key={index} src={s} alt="home" />
          ))}
        </Carousel>
      </div>

      <div className="w-[90%] gap-8 p-8 flex flex-col justify-start">
        {Object.keys(featuredCategorizedEvents).map((category, index) => (
          <div key={index}>
            <h2
              className="m-0 mb-4 text-[30px] text-neutral-200 font-extrabold cursor-pointer"
              onClick={() => handleCategoryClick(category)} // Attach click event handler
            >
              {category}
            </h2>
            
            <CardSwipe events={featuredCategorizedEvents[category]} />
          </div>
        ))}
      </div>
    </div>
  );
}
