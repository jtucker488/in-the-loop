import { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";

export default function SubcategoryDropdown({ modifyEventOrEvent }) {
  const CategoriesAndSubcategories = useSelector(
    (state) => state.searchResults.categoriesMeta
  );

  const current_category = "Technology";
  let current_subcategory;
  if (modifyEventOrEvent === "event") {
    current_subcategory = useSelector((state) => state.event.subcategory);
  } else {
    current_subcategory = useSelector((state) => state.modifyEvent.subcategory);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset subcategory on category change
    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: "subcategory", value: "" }));
    } else {
      dispatch(modify_modifyEvent({ field: "subcategory", value: "" }));
    }
  }, [current_category, dispatch]);
  let subcategories;
 
  if (CategoriesAndSubcategories && CategoriesAndSubcategories.length > 0) {

    const currentCategoryObject = CategoriesAndSubcategories.find(
      (category) => category.category_name === current_category
    );

    subcategories = currentCategoryObject
      ? currentCategoryObject.subcategories.map(
          (subcategory) => subcategory.subcategory_name
        )
      : [];
  }

  const handleCategorySelect = (subcategory) => {
    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: "subcategory", value: subcategory }));
    } else {
      dispatch(
        modify_modifyEvent({ field: "subcategory", value: subcategory })
      );
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          outline={true}
          className="inline-flex items-center bg-brand-blue text-white font-medium px-4 py-2 rounded-md hover:bg-sky-blue transition"
        >
          <span>{current_subcategory || "Subcategory"}</span>
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5 ml-1" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="scrollbar-subcategory absolute left-0 top-full z-10 mt-2 w-56 origin-top-left rounded-md bg-neutral-700 shadow-lg ring-1 ring-black/5 transition focus:outline-none max-h-48 overflow-y-auto"
      >
        {subcategories &&
          subcategories.map((subcategory, index) => (
            <MenuItem
              as="div" // Render as div or button
              key={index}
              onClick={() => handleCategorySelect(subcategory)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-blue hover:text-white cursor-pointer"
            >
              {subcategory}
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
}
