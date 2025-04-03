import ChooseAddressState from "./chose-address-state";
import AddressGeneralInput from "./address-general-input";

export default function InputAddress({ address, setAddress, city, setCity, state, setState, zip, setZip }) {
  return (
    <div className="mx-auto p-4 flex flex-col gap-4" style={{ width: "500px" }}>
      <AddressGeneralInput label={"Address"} value={address} onChange={setAddress} />

      <div className="flex gap-2 items-center">
        <div className="w-[200px]">
          <AddressGeneralInput label={"City"} value={city} onChange={setCity} />
        </div>
        <ChooseAddressState selectedState={state} setSelectedState={setState} />
        <div className="w-[113px]">
          <AddressGeneralInput label={"Zip"} value={zip} onChange={setZip} />
        </div>
      </div>
    </div>
  );
}