"use client";
import CardSwipe from "../../components/home-page-componets/card-swipe";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import dayjs from "dayjs";
import { modify } from "../../components/redux/slices/searchResultsSlice";
import {
  clearFilters,
  fetchSelectedEvents,
} from "../../components/redux/slices/searchResultsSlice";
import SuperFeaturedCards from "../../components/home-page-componets/super-featured-cards";

const slides = [
  "./images/event2.jpg",
  "./images/event3.jpg",
  "./images/event4.jpg",
];

export default function HomePage({ superFeatured, featured }) {
  return (
    <>
      <div className="relative z-0 ">
        <SuperFeaturedCards superFeatured={superFeatured} autoSlide={true} />
      </div>
      <div className="relative flex flex-col items-center -mt-[100px] z-20">
        <div className="w-[90%] gap-8 pl-0 flex flex-col justify-start ">
          {Object.keys(featured).map((subcategory, index) => (
            <div key={index}>
              <h2 className="m-0 mb-4 text-[30px] text-neutral-200 font-bold cursor-pointer">
                {subcategory}
              </h2>
              <CardSwipe events={featured[subcategory]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
