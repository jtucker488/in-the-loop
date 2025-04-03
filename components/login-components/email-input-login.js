import { useSelector, useDispatch } from "react-redux";
import { modify } from "../redux/slices/loginSlice";

export default function EmailInputLogin() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const handleChange = (e) => {
    const newValue = e.target.value;
    dispatch(modify({ field: "email", value: newValue })); // Dispatch the field and value to the modify action
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="text-white text-sm font-semibold mb-1 block"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        className="bg-neutral-700 font-normal w-full h-12 rounded-xl text-input-text-color px-4
        focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
      />
    </div>
  );
}
