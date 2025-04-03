"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="pt-[150px] pb-[100px]">
      <DynamicMap />
    </div>
  );
}