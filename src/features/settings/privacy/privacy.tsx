import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../../../shared/components/ui/custom-switch";

function Privacy() {
  const { t } = useTranslation();
  const selectClassName =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
  const [visibility, setVisibility] = useState<"Public" | "Private">("Public");
  const [options, setOptions] = useState({
    showLikes: true,
    showDownloads: true,
    hideCollections: false,
    appearInSearch: true,
  });

  const toggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const rows = [
    {
      key: "showLikes" as const,
      title: t("settings:privacy_items.showLikes"),
      subtitle: t("settings:privacy_items.showLikes_desc"),
    },
    {
      key: "showDownloads" as const,
      title: t("settings:privacy_items.showDownloads"),
      subtitle: t("settings:privacy_items.showDownloads_desc"),
    },
    {
      key: "hideCollections" as const,
      title: t("settings:privacy_items.hideCollections"),
      subtitle: t("settings:privacy_items.hideCollections_desc"),
    },
    {
      key: "appearInSearch" as const,
      title: t("settings:privacy_items.appearInSearch"),
      subtitle: t("settings:privacy_items.appearInSearch_desc"),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">{t("settings:privacy_intro")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {t("settings:privacy_items.profileVisibility")}
        </label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as "Public" | "Private")}
          className={`${selectClassName} md:w-72`}
        >
          <option value="Public">{t("settings:privacy_visibility.public")}</option>
          <option value="Private">{t("settings:privacy_visibility.private")}</option>
        </select>
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
            <ToggleSwitch
              checked={options[row.key]}
              onChange={() => toggle(row.key)}
              trackBg={options[row.key] ? "bg-blue-600" : "bg-slate-300"}
              thumbBg="bg-white"
              width={44}
              height={24}
              thumbSize={18}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
