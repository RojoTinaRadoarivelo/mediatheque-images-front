import { useTranslation } from "react-i18next";
import "./settings.scss";
import { useState } from "react";
import Appearance from "./appearance/appearance";
import Preference from "./preferences/preferences";
import Security from "./security/security";
// import { useAuth } from "../auth/context/auth.context";

function settings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { t } = useTranslation();
  // const { user } = useAuth();

  return (
    <div className="w-full h-screen flex gap-4">
      {/* SIDEBAR */}
      <div className="border-r border-gray-200 w-48 p-4 bg-gray-50">
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
      <div className="flex flex-col flex-1  p-3 pl-5 bg-white">
        {activeTab === "appearance" && <Appearance></Appearance>}
        {activeTab === "preferences" && <Preference></Preference>}
        {activeTab === "security" && <Security></Security>}
      </div>
    </div>
  );
}

export default settings;
