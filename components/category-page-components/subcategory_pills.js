import { useSelector, useDispatch } from "react-redux";
import { modify, fetchSelectedEvents } from "../redux/slices/searchResultsSlice";
import { useEffect, useRef, useState } from "react";
import SubcategoryPill from "./subcategory_pill";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function SubCategoryPills({loading, setLoading, subcategories}) {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.searchResults["category"]);
  const categoriesMeta = useSelector(
    (state) => state.searchResults["categoriesMeta"]
  );
  const current_subcategory = useSelector(
    (state) => state.searchResults["subcategory"]
  );
  const fullyLoaded = useSelector(
    (state) => state.searchResults.dataFullyLoaded
  );

  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const current_page = useSelector((state) => state.searchResults.current_page);

  const handleScroll = async () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 2 &&
      !loading
    ) {
      setLoading(true);
      console.log("handle scroll triggered!");
      await dispatch(modify({ field: "current_page", value: current_page + 1 }));
      await dispatch(fetchSelectedEvents());
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetchSelectedEvents! ");
    async function fetchFirstSubcategory() {
      await dispatch(modify({ field: "dataFullyLoaded", value: false }));
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      await dispatch(fetchSelectedEvents());
    }
    fetchFirstSubcategory();
  }, [dispatch]);

  useEffect(() => {
    if (fullyLoaded) {
      setLoading(false);
    }
  }, [fullyLoaded]);

  useEffect(() => {
    if (!fullyLoaded) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [current_page, loading, fullyLoaded]);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
        checkIfAtEnd();
      }
    };

    const checkIfAtEnd = () => {
      const container = scrollContainerRef.current;
      if (container) {
        const isAtEnd =
          Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth;
        setIsAtEnd(isAtEnd);
      }
    };

    checkScrollable();

    window.addEventListener("resize", checkScrollable);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", checkIfAtEnd);
    }

    return () => {
      window.removeEventListener("resize", checkScrollable);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", checkIfAtEnd);
      }
    };
  }, [subcategories]);

  return (
    <div className="relative w-full">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-2 w-full scrollbar-hide relative"
      >
        {subcategories.map((item, index) => (
          <div key={index} className="inline-block">
            <SubcategoryPill subcategory={item} />
          </div>
        ))}
      </div>

      {isScrollable && !isAtEnd && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-black to-transparent pr-4 pointer-events-none">
          <ArrowCircleRightIcon className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}