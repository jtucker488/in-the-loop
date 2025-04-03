import React, { useState } from "react";
import HashtagButtonContainer from "./hashtag-button-container";
import SelectedHashtagButtonContainer from "./selected-hashtag-button-container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Field, Label, Input } from "@headlessui/react";
import CalendarInputFilter from "../calendar-filter-input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

function FilterPage() {
  const dispatch = useDispatch();
  const selectedHashtags = useSelector(
    (state) => state.searchResults.selectedHashtags
  );

  const available_hashtags = useSelector(
    (state) => state.searchResults.available_hashtags
  );
  // const hashtags = useSelector((state) => state.searchResults.hashtags);
  const [suggestions, setSuggestions] = useState([]);

  const [query, setQuery] = useState("");
  const [hashtagKeys, setHashtagKeys] = useState([]);
  useEffect(() => {
    if (available_hashtags && Object.keys(available_hashtags).length > 0) {
      setHashtagKeys(Object.keys(available_hashtags));
    } else {
      setHashtagKeys([]);
    }
  }, [available_hashtags]);
  useEffect(() => {
    const value = query;
    if (value.length > 0) {
      const filteredSuggestions = hashtagKeys
        .filter((tag) => {
          const lowerCaseTag = tag.toLowerCase();
          const isAlreadySelected = selectedHashtags.some(
            (selectedTag) => selectedTag.toLowerCase() === lowerCaseTag
          );
          return (
            lowerCaseTag.includes(value.toLowerCase()) && !isAlreadySelected
          );
        })
        .map((tag) => ({
          name: tag,
          color: available_hashtags[tag], // Add the color dictionary
        }));
      setSuggestions(filteredSuggestions);
    } else {
      const filteredSuggestions = hashtagKeys
        .filter((tag) => {
          const lowerCaseTag = tag.toLowerCase();
          const isAlreadySelected = selectedHashtags.some(
            (selectedTag) => selectedTag.toLowerCase() === lowerCaseTag
          );
          return !isAlreadySelected;
        })
        .map((tag) => ({
          name: tag,
          color: available_hashtags[tag], // Add the color dictionary
        }));
      setSuggestions(filteredSuggestions);
    }
  }, [selectedHashtags, query, hashtagKeys, available_hashtags]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div className="overflow-hidden w-[280px] sm:w-[400px] px-6 pt-6 absolute left-0 mt-4 bg-neutral-800  rounded-md z-50">
      {/* <InputGroup> */}

        <Input
          type="text"
          value={query}
          className="bg-neutral-700 font-normal w-full h-10 rounded-xl text-input-text-color px-4
          focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          onChange={handleInputChange}
          placeholder="Search hashtags..."
          // className="hashtag-input bg-neutral-200 has-outline block mb-4 w-full pl-4 p-2 rounded-3xl p-1.5 text-neutral-900 placeholder:text-neutral-900 border-none focus:outline-white focus:ring-2 focus:ring-white sm:text-sm sm:leading-6"
        />
      {/* </InputGroup> */}
      <div className="h-[220] sm:h-[350px]">
        <SelectedHashtagButtonContainer />
        <HashtagButtonContainer suggestions={suggestions} />
      </div>
    </div>
  );
}

export default FilterPage;
