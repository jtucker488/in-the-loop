import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { modifySearchBarInput } from "../redux/slices/searchResultsSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@headlessui/react";

// FIX HERE
export default function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  useEffect(() => {
    dispatch(modifySearchBarInput(query));
  }, [query, dispatch]);

  return (
    <div className="w-full">
      {/* <MagnifyingGlassIcon
          style={{
            width: "1.25rem", // Icon size
            height: "1.25rem",
            color: "#111827", // Tailwind `neutral-900` in hex
            position: "absolute",
            left: "0.75rem", // Align to the left
            top: "calc(50% - 0.55rem )", // Center vertically and move up by 3px
          }}
        /> */}
      <Input
        id="html_link"
        name="html_link"
        className="bg-neutral-700 w-full h-10 rounded-xl text-neutral-300 px-4
             focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600 placeholder-neutral-300"
        value={query || ""}
        placeholder="Search Events..."
        onChange={handleInputChange}
      />
    </div>
  );
}
