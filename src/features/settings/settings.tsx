import { useTranslation } from "react-i18next";
import "./settings.scss";
import i18n from "../../assets/i18n";
import { useState } from "react";
import { useLayout } from "../../layouts/context/layout.context";

function settings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { layout, setLayout } = useLayout();
  const { t } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
  };

  return (
    <div className="w-full h-screen flex gap-4">
      {/* SIDEBAR */}
      <div className="border-r border-gray-200 w-72 p-4 bg-gray-50">
        <ul className="space-y-2">
          <li
            onClick={() => setActiveTab("appearance")}
            className="cursor-pointer hover:text-blue-600"
          >
            {t("settings:appearance")}
          </li>
          <li
            onClick={() => setActiveTab("preferences")}
            className="cursor-pointer hover:text-blue-600"
          >
            {t("settings:preferences")}
          </li>
          <li
            onClick={() => setActiveTab("security")}
            className="cursor-pointer hover:text-blue-600"
          >
            {t("settings:security")}
          </li>
          <li
            onClick={() => setActiveTab("notifications")}
            className="cursor-pointer hover:text-blue-600"
          >
            {t("settings:notifications")}
          </li>
          <li
            onClick={() => setActiveTab("privacy")}
            className="cursor-pointer hover:text-blue-600"
          >
            {t("settings:privacy")}
          </li>
        </ul>
      </div>
      <div className="flex flex-col flex-1 p-2 bg-white">
        {activeTab === "preferences" && (
          <form className="">
            {/* user form */}
            <div className="w-full pr-4 space-y-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  {t("common:general.language")}
                </label>
                <select
                  className="border-2 border-gray-200 p-2 rounded-md selection w-1/2"
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Layout
                </label>
                <select
                  name="layoutSelection"
                  id="layoutSelection"
                  className="border-2 border-gray-200 p-2 rounded-md selection w-1/2"
                  value={layout}
                  onChange={(e) =>
                    setLayout(e.target.value as "Vertical" | "Horizontal")
                  }
                >
                  <option value="Vertical">Vertical</option>
                  <option value="Horizontal">Horizontal</option>
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
        )}
      </div>
    </div>
  );
}

export default settings;
