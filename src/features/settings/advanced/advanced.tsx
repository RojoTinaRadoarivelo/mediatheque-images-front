import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleSwitch from "../../../shared/components/ui/custom-switch";

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
    <div className="space-y-5 text-foreground">
      <div className="rounded-xl border border-border bg-muted/60 p-4">
        <p className="text-sm text-muted-foreground">
          {t("settings:advanced_intro")}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-background p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">
            {t("settings:advanced_items.betaFeatures")}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("settings:advanced_items.betaFeatures_desc")}
          </p>
        </div>
        <ToggleSwitch
          checked={betaFeatures}
          onChange={setBetaFeatures}
          trackBg={betaFeatures ? "bg-blue-600" : "bg-slate-300"}
          thumbBg="bg-white"
          width={44}
          height={24}
          thumbSize={18}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action}
            type="button"
            className="rounded-lg border border-border bg-background px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Advanced;
