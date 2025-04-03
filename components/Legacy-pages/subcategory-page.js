"use client"
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeta, modify } from "../redux/slices/searchResultsSlice";
import EventCard from "../home-page-componets/event-card";
import SubCategoryPills from "../category-page-components/subcategory_pills";
import { usePathname } from "next/navigation";
const CategoryPage = () => {
  let category = "Technology"
  console.log("helloooo home");


  const [loading, setLoading] = useState(false);
  const fullyLoaded = useSelector(
    (state) => state.searchResults.dataFullyLoaded
  );

  const categoriesMeta = useSelector(
    (state) => state.searchResults["categoriesMeta"]
  );
  const dispatch = useDispatch();

  const DisplayedEvents = useSelector(
    (state) => state.searchResults.displayedEvents
  );

  const subcategory = useSelector((state) => state.searchResults.subcategory);

  const cardWidth = 432; // Width of each event card
  const pagePadding = 64; // Total padding on the page
  const [cardContainerWidth, setCardContainerWidth] = useState(0);

  useEffect(() => {
    dispatch(modify({ field: "category", value: category }));
    dispatch(fetchMeta());
  }, [dispatch, category]);

  useEffect(() => {
    if (categoriesMeta[category]?.length > 0) {
      dispatch(
        modify({ field: "subcategory", value: "All" }) // Make sure to access the `name` property of the first subcategory
      );
    }
  }, [categoriesMeta, category, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const calculateContainerWidth = () => {
      const viewportWidth = window.innerWidth;
      const cardsInRow = Math.floor((viewportWidth - pagePadding) / cardWidth);
      setCardContainerWidth(cardsInRow * cardWidth);
    };

    calculateContainerWidth();
    window.addEventListener("resize", calculateContainerWidth);

    return () => {
      window.removeEventListener("resize", calculateContainerWidth);
    };
  }, []);

  // Ensure the tabs are not rendered until categoriesMeta and the category subcategories exist
  const subcategories = categoriesMeta[category] || [];
  return (
    <div className="px-10">
      {/* <div className="flex items-center">
        {DisplayedEvents && <h1 className="ml-8 my-8 text-5xl">{category}</h1>}
      </div> */}

      {/* Only render the Tabs if categoriesMeta[category] exists and has subcategories */}
      {subcategory && (
        <SubCategoryPills
          loading={loading}
          setLoading={setLoading}
          subcategories={["All", ...subcategories]}
        />
      )}

      <div className="flex flex-col items-center p-8">
        {fullyLoaded && DisplayedEvents.length === 0 && (
          <p>No Events in This Cateogry</p>
        )}
        <div
          style={{ width: `${cardContainerWidth}px` }}
          className="inline-block flex flex-wrap justify-start"
        >
          {DisplayedEvents.map((event, index) => (
            <div className="p-4" key={index}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 mb-8">
        <ClipLoader loading={loading} size={30} color={"#ffffff"} />
      </div>
    </div>
  );
};

export default CategoryPage;
