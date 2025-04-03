import React from "react";
function PresentedHashtagForm({ hashtag }) {
  return (
    <div className="relative">
      <button className="px-3 py-2 m-1.5 text-sm rounded-full  text-neutral-200 bg-neutral-900 text-white cursor-pointer">
        {hashtag}
      </button>
    </div>
  );
}

export default PresentedHashtagForm;
