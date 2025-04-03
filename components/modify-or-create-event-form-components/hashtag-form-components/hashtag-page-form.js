import React, { useState, useEffect } from "react";
import HashtagButtonContainerForm from "./hashtag-button-container-form";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function HashtagPageForm({ modifyEventOrEvent }) {
  const available_hashtags = useSelector(
    (state) => state.searchResults.available_hashtags
  );
  let selectedHashtags;
  if (modifyEventOrEvent === "event") {
    selectedHashtags = useSelector((state) => state.event.hashtags);
  } else {
    selectedHashtags = useSelector((state) => state.modifyEvent.hashtags);
  }
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
    setQuery(event.target.value);
  };

  return (
    <div className="w-[300px] sm:w-[400px] px-6 py-6 absolute left-0 mt-4 bg-neutral-700 rounded-md z-50 custom-scrollbar">
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search hashtags..."
          className="bg-neutral-200 w-full pl-10 py-2 rounded-3xl text-neutral-900 placeholder:text-neutral-600 border-none focus:outline-white focus:ring-2 focus:ring-white"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-600 w-5 h-5" />
      </div>
      <div className="overflow-y-auto h-[280px] sm:h-[350px] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        <HashtagButtonContainerForm
          modifyEventOrEvent={modifyEventOrEvent}
          suggestions={suggestions}
        />
      </div>
    </div>
  );
}

export default HashtagPageForm;
