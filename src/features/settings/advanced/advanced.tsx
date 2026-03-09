import { useState } from "react";
import { useTranslation } from "react-i18next";

function Advanced() {
  const { t } = useTranslation();
  const [betaFeatures, setBetaFeatures] = useState(false);

  const actions = [
    t("settings:advanced_items.exportData"),
    t("settings:advanced_items.dataUsage"),
    t("settings:advanced_items.clearCache"),
    t("settings:advanced_items.connectedAccounts"),
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">{t("settings:advanced_intro")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            {t("settings:advanced_items.betaFeatures")}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {t("settings:advanced_items.betaFeatures_desc")}
          </p>
        </div>
        <button
          type="button"
          aria-label={t("settings:advanced_items.betaFeatures")}
          onClick={() => setBetaFeatures((prev) => !prev)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            betaFeatures ? "bg-blue-600" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
              betaFeatures ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Advanced;
