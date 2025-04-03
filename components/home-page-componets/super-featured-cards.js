"use client";
import React, { useState, useEffect, useCallback } from "react";
import SuperFeaturedCard from "./super-featured-card";

const SuperFeaturedCards = ({
  autoSlide = false,
  autoSlideInterval = 6000,
  superFeatured,
}) => {
  const [curr, setCurr] = useState(0);

  const next = useCallback(() => {
    setCurr((prevCurr) =>
      prevCurr === superFeatured.length - 1 ? 0 : prevCurr + 1
    );
  }, [superFeatured.length]);

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="relative w-full h-[90vh] z-0 overflow-hidden">
      {/* Slider with Fade Effect */}
      <div className="relative w-full h-full">
        {superFeatured &&
          superFeatured?.map((event, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === curr ? "opacity-100" : "opacity-0"
              }`}
            >
              <SuperFeaturedCard event={event} index={index} />

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-[10%] bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SuperFeaturedCards;
