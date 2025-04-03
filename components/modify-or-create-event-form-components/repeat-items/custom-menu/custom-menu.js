import ToggleDays from "./ToggleDays";
import FrequencySelectMenu from "./frequency-select-menu";
import NumberMenu from "./number-menu";
import RadioGroup from "./radio-group";

export default function CustomMenu() {
  return (
    <>
      <div className="ml-2 p-4 flex flex-col gap-4 bg-neutral-800 rounded">
        <p className="text-lg ml-4  mt-2 mb-2 text-input-text-color">
          Customize
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <p className="ml-2  text-input-text-color text-sm font-medium">Repeat every</p>
          <NumberMenu name="repeat_frequency" />
          <FrequencySelectMenu />
        </div>
        <div>
          <div className="flex flex-start">
            <p className="text-sm font-medium ml-2 my-2 text-input-text-color">
              Repeat on
            </p>
          </div>

          <ToggleDays />
        </div>
        <div>
          <div className="flex flex-start">
            <p className="text-sm font-medium ml-2 mt-2 text-input-text-color">Ends on</p>
          </div>
          <RadioGroup />
        </div>
      </div>
    </>
  );
}
