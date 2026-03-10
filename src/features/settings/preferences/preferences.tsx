import { useTranslation } from "react-i18next";
import i18n, {
  LanguageList,
  type LanguageListType,
} from "../../../assets/i18n";
import { useState } from "react";
import {
  sortings,
  type sortingType,
} from "../DTOs/preference.dto";
import { useUpdatePreference } from "../../../shared/services/preferences.queries";
import { useAuth } from "../../auth/context/auth.context";
import { getMergedPreference } from "../utils/preference.utils";
import ToggleSwitch from "../../../shared/components/ui/custom-switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "@/components/ui/button";

const languageOptions: Record<LanguageListType, { label: string; flag: string }> = {
  en: { label: "EN", flag: "/flags/EN.svg" },
  fr: { label: "FR", flag: "/flags/FR.svg" },
  mg: { label: "MG", flag: "/flags/MG.svg" },
};

function Preference() {
  const { t } = useTranslation();
  const [defaultSort, setDefaultSorting] = useState<sortingType>(
    (localStorage.getItem("sort") ?? "Default") as sortingType,
  );
  const [downloadQuality, setDownloadQuality] = useState<
    "Original" | "High" | "Medium"
  >("High");
  const [autoLikeDoubleClick, setAutoLikeDoubleClick] = useState(false);
  const [safeSearch, setSafeSearch] = useState(true);
  const [defaultHomepage, setDefaultHomepage] = useState<
    "Explore" | "Trending" | "Following"
  >("Explore");

  const { user, isAuthenticated } = useAuth();
  const { mutate: updatePreference } = useUpdatePreference();
  const languages: LanguageListType[] = LanguageList;
  const sortingList: string[] = sortings;
  const currentLanguage = (i18n.language as LanguageListType) ?? "en";
  const currentLanguageOption = languageOptions[currentLanguage];
  const selectClassName =
    "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40";

  const changeLanguage = (lang: LanguageListType) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
  };

  const changeDefaultSorting = (sort: string) => {
    setDefaultSorting(sort as sortingType);
    localStorage.setItem("sort", sort);
  };

  const handleSubmit = () => {
    if (!isAuthenticated || !user?.id) return;

    const savingPreference = getMergedPreference(user.preference, {
      language: i18n.language as LanguageListType,
      predispositions: {
        sorting: defaultSort,
      },
    });
    updatePreference(
      { user_id: user.id, preferences: savingPreference },
      {
        onSuccess: () => {
          console.log(savingPreference);
        },
      },
    );
  };

  const Cancel = () => {
    setDefaultSorting((localStorage.getItem("sort") ?? "Default") as sortingType);
  };

  return (
    <div className="space-y-5 text-foreground">
      <div className="rounded-xl border border-border bg-muted/60 p-4">
        <p className="text-sm text-muted-foreground">
          Configure tes preferences linguistiques et de tri pour personnaliser
          ton experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-background p-4">
          <label className="block text-sm font-semibold mb-2">
            {t("common:general.language")}
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Langue d'affichage de l'interface.
          </p>
          <Select
            value={currentLanguage}
            onValueChange={(value) => changeLanguage(value as LanguageListType)}
          >
            <SelectTrigger className="h-10 w-full rounded-xl border-border bg-background text-sm">
              <SelectValue>
                <span className="inline-flex items-center gap-2 uppercase">
                  <img
                    src={currentLanguageOption.flag}
                    alt={currentLanguageOption.label}
                    className="w-4 h-4 rounded-sm"
                  />
                  {currentLanguageOption.label}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((el) => (
                <SelectItem key={el} value={el}>
                  <span className="inline-flex items-center gap-2 uppercase">
                    <img
                      src={languageOptions[el].flag}
                      alt={languageOptions[el].label}
                      className="w-4 h-4 rounded-sm"
                    />
                    {languageOptions[el].label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <label className="block text-sm font-semibold mb-2">
            Sorting
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Ordre par defaut des contenus.
          </p>
          <select
            name="sortingSelection"
            id="sortingSelection"
            className={selectClassName}
            value={defaultSort}
            onChange={(e) => changeDefaultSorting(e.target.value)}
          >
            {sortingList.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <label className="block text-sm font-semibold mb-2">
            Default Download Quality
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Default quality for quick downloads.
          </p>
          <select
            className={selectClassName}
            value={downloadQuality}
            onChange={(e) =>
              setDownloadQuality(
                e.target.value as "Original" | "High" | "Medium",
              )
            }
          >
            <option value="Original">Original</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <label className="block text-sm font-semibold mb-2">
            Default Homepage
          </label>
          <p className="text-xs text-muted-foreground mb-3">
            Choose where the app opens first.
          </p>
          <select
            className={selectClassName}
            value={defaultHomepage}
            onChange={(e) =>
              setDefaultHomepage(
                e.target.value as "Explore" | "Trending" | "Following",
              )
            }
          >
            <option value="Explore">Explore</option>
            <option value="Trending">Trending</option>
            <option value="Following">Following</option>
          </select>
        </div>

        <div className="rounded-xl border border-border bg-background p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">
                Auto-like on double click
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Automatically like image on double click.
              </p>
            </div>
            <ToggleSwitch
              checked={autoLikeDoubleClick}
              onChange={setAutoLikeDoubleClick}
              trackBg={autoLikeDoubleClick ? "bg-blue-600" : "bg-slate-300"}
              thumbBg="bg-white"
              width={44}
              height={24}
              thumbSize={18}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Safe search</p>
              <p className="text-xs text-muted-foreground mt-1">
                Filter sensitive content in results.
              </p>
            </div>
            <ToggleSwitch
              checked={safeSearch}
              onChange={setSafeSearch}
              trackBg={safeSearch ? "bg-blue-600" : "bg-slate-300"}
              thumbBg="bg-white"
              width={44}
              height={24}
              thumbSize={18}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-4">
        <p className="text-sm text-muted-foreground">
          Valeurs actuelles:{" "}
          <span className="font-medium text-foreground uppercase">
            {i18n.language}
          </span>
          {" | "}
          <span className="font-medium text-foreground">{defaultSort}</span>
          {" | "}
          <span className="font-medium text-foreground">
            {downloadQuality}
          </span>
          {isAuthenticated && user?.id ? "" : " | mode local uniquement"}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-start">
        <div className="flex gap-3">
          <Button
            onClick={() => Cancel()}
            variant="outline"
            size="lg"
            className="button-reset h-10 rounded-xl px-5"
          >
            {t("common:general.cancel")}
          </Button>
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            size="lg"
            className="button-reset h-10 rounded-xl px-5 font-semibold"
          >
            {t("common:general.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Preference;
