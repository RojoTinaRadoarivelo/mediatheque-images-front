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

function Preference() {
  const { t } = useTranslation();
  const [defaultSort, setDefaultSorting] = useState<sortingType>(
    (localStorage.getItem("sort") ?? "Default") as sortingType,
  );

  const { user, isAuthenticated } = useAuth();
  const { mutate: updatePreference } = useUpdatePreference();
  const languages: string[] = LanguageList;
  const sortingList: string[] = sortings;

  const changeLanguage = (lang: string) => {
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
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">
          Configure tes preferences linguistiques et de tri pour personnaliser
          ton experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {t("common:general.language")}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Langue d'affichage de l'interface.
          </p>
          <select
            className="border border-slate-300 p-2 rounded-md selection w-full uppercase"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            {languages.map((el) => (
              <option key={el} value={el} className="uppercase">
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Sorting
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Ordre par defaut des contenus.
          </p>
          <select
            name="sortingSelection"
            id="sortingSelection"
            className="border border-slate-300 p-2 rounded-md selection w-full"
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
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">
          Valeurs actuelles:{" "}
          <span className="font-medium text-slate-700 uppercase">
            {i18n.language}
          </span>
          {" | "}
          <span className="font-medium text-slate-700">{defaultSort}</span>
          {isAuthenticated && user?.id ? "" : " | mode local uniquement"}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-start">
        <div className="flex gap-3">
          <button
            onClick={() => Cancel()}
            className="px-6 py-2  bordered  rounded-lg hover:bg-gray-500 hover:text-white "
          >
            {t("common:general.cancel")}
          </button>
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            {t("common:general.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preference;
