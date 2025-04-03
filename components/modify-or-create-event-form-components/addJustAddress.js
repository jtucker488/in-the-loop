import { useSelector, useDispatch } from "react-redux";
import { Field, Label, Input } from "@headlessui/react";

export default function AddJustAddress({}) {
  return (
    <div className="relative mt-4 w-full">
      {/* Label for Add Address */}
      <label className="text-white text-sm font-medium mb-2 block text-left">
        Add address
      </label>

      {/* Input Field */}
      <div
        className="bg-neutral-700 font-normal w-full h-10 rounded-xl text-input-text-color px-4
                   focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
      />
    </div>
  );
}