"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SuperFeaturedCards from "./super-featured-cards";

const ConditionalSuperFeatured = ({ slide, index }) => {
  const currentPath = usePathname();

  // Return valid JSX
  if (currentPath === "/") {
    return (
      <></>
      // <div className="relative z-0 ">
      //     <SuperFeaturedCards autoSlide={true} />
      // </div>
    );
  }

  // If the current path is not "/", return null or an alternative component
  return null;
};

export default ConditionalSuperFeatured;
