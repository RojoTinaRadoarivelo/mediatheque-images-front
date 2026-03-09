import { useState } from "react";
import { useTranslation } from "react-i18next";

function Notifications() {
  const { t } = useTranslation();
  const [state, setState] = useState({
    emailLikesComments: true,
    pushNotifications: false,
    newFollowerAlert: true,
    weeklyReport: false,
  });

  const toggle = (key: keyof typeof state) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const rows = [
    {
      key: "emailLikesComments" as const,
      title: t("settings:notifications_items.emailLikesComments"),
      subtitle: t("settings:notifications_items.emailLikesComments_desc"),
    },
    {
      key: "pushNotifications" as const,
      title: t("settings:notifications_items.pushNotifications"),
      subtitle: t("settings:notifications_items.pushNotifications_desc"),
    },
    {
      key: "newFollowerAlert" as const,
      title: t("settings:notifications_items.newFollowerAlert"),
      subtitle: t("settings:notifications_items.newFollowerAlert_desc"),
    },
    {
      key: "weeklyReport" as const,
      title: t("settings:notifications_items.weeklyReport"),
      subtitle: t("settings:notifications_items.weeklyReport_desc"),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">
          {t("settings:notifications_intro")}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        {rows.map((row, index) => (
          <div
            key={row.key}
            className={`p-4 flex items-center justify-between gap-4 ${
              index !== rows.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-slate-700">{row.title}</p>
              <p className="text-xs text-slate-500 mt-1">{row.subtitle}</p>
            </div>
            <button
              type="button"
              aria-label={row.title}
              onClick={() => toggle(row.key)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                state[row.key] ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  state[row.key] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
