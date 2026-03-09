import { useTranslation } from "react-i18next";
import "./settings.scss";
import { useState } from "react";
import Appearance from "./appearance/appearance";
import Preference from "./preferences/preferences";
import Security from "./security/security";
import { useAuth } from "../auth/context/auth.context";

function Settings() {
  const [activeTab, setActiveTab] = useState("appearance");
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const tabs = [
    { key: "appearance", label: t("settings:appearance") },
    { key: "preferences", label: t("settings:preferences") },
    { key: "security", label: t("settings:security") },
    { key: "notifications", label: t("settings:notifications") },
    { key: "privacy", label: t("settings:privacy") },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
        <aside className="rounded-xl border border-slate-200 bg-white p-3 md:p-4 h-fit">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase mb-3">
            Settings
          </p>
          <ul className="space-y-1.5">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.key
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-6">
          <div className="mb-5 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">
              {tabs.find((tab) => tab.key === activeTab)?.label}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isAuthenticated
                ? "Vos changements sont sauvegardes localement et en backend."
                : "Mode invite: changements locaux uniquement, sans sauvegarde backend."}
            </p>
          </div>

          {activeTab === "appearance" && <Appearance></Appearance>}
          {activeTab === "preferences" && <Preference></Preference>}
          {activeTab === "security" && <Security></Security>}
          {activeTab === "notifications" && (
            <div className="text-sm text-slate-500">
              Notifications a venir.
            </div>
          )}
          {activeTab === "privacy" && (
            <div className="text-sm text-slate-500">Privacy a venir.</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Settings;
