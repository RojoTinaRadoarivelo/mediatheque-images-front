import { useEffect } from "react";
import {
  Layouts,
  useLayout,
  type LayoutType,
} from "../../../layouts/context/layout.context";
import {
  themes,
  useTheme,
  type ThemeType,
} from "../../../shared/context/themes";
import { useTranslation } from "react-i18next";

function Appearance() {
  const { layout, setLayout } = useLayout();

  const { Theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    setTimeout(() => {
      const currentTheme = (localStorage.getItem("Theme") ??
        "Light") as ThemeType;
      changeTheme(currentTheme);
    }, 200);
  }, [Theme]);

  return (
    <form className="">
      {/* user form */}
      <div className="w-full pr-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Layout
          </label>
          <select
            name="layoutSelection"
            id="layoutSelection"
            className="border-2 border-gray-200 p-2 rounded-md selection w-1/2"
            value={layout}
            onChange={(e) => setLayout(e.target.value as LayoutType)}
          >
            {Layouts.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label
            htmlFor="Theme"
            className="block text-sm font-medium text-gray-700"
          >
            Theme
          </label>
          <select
            className="border-2 border-gray-200 p-2 rounded-md selection w-1/2"
            value={Theme}
            onChange={(e) => changeTheme(e.target.value as ThemeType)}
            id="Theme"
          >
            {themes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* ACTIONS */}
      <div className="mt-6 flex justify-start">
        <div className="flex gap-3">
          <button
            // onClick={() => Cancel()}
            className="px-6 py-2  bordered  rounded-lg hover:bg-gray-500 hover:text-white "
          >
            {t("common:general.cancel")}
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("common:general.save")}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Appearance;
