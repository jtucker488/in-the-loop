import { Field, Label, Input } from "@headlessui/react";

export default function AddressGeneralInput({ label, value, onChange }) {
  return (
    <div className="relative mt-2 w-full">
      <Field className="flex flex-col items-start">
        <Label className="text-white text-sm font-medium mb-2">{label}</Label>
        <Input
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-neutral-700 font-normal w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-400"
        />
      </Field>
    </div>
  );
}