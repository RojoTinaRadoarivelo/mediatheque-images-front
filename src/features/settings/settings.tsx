import { useTranslation } from "react-i18next";
import "./settings.scss";
import { useState } from "react";
import Appearance from "./appearance/appearance";
import Preference from "./preferences/preferences";
import Security from "./security/security";
import { useAuth } from "../auth/context/auth.context";
import Notifications from "./notifications/notifications";
import Privacy from "./privacy/privacy";
import Advanced from "./advanced/advanced";

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
    { key: "advanced", label: t("settings:advanced") },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
        <aside className="rounded-xl border border-border bg-card p-3 md:p-4 h-fit">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-3">
            Settings
          </p>
          <ul className="space-y-1.5">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`button-reset w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.key
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="rounded-xl border border-border bg-card p-4 md:p-6">
          <div className="mb-5 pb-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              {tabs.find((tab) => tab.key === activeTab)?.label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isAuthenticated
                ? "Vos changements sont sauvegardes localement et en backend."
                : "Mode invite: changements locaux uniquement, sans sauvegarde backend."}
            </p>
          </div>

          {activeTab === "appearance" && <Appearance></Appearance>}
          {activeTab === "preferences" && <Preference></Preference>}
          {activeTab === "security" && <Security></Security>}
          {activeTab === "notifications" && <Notifications></Notifications>}
          {activeTab === "privacy" && <Privacy></Privacy>}
          {activeTab === "advanced" && <Advanced></Advanced>}
        </section>
      </div>
    </div>
  );
}

export default Settings;
