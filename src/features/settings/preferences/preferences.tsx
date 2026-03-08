import { useTranslation } from "react-i18next";
import i18n, { LanguageList } from "../../../assets/i18n";
import { useState } from "react";
import { sortings, type sortingType } from "../DTOs/preference.dto";

function Preference() {
  const { t } = useTranslation();
  const [defaultSort, setDefaultSorting] = useState<sortingType>(
    (localStorage.getItem("sort") ?? "Default") as sortingType,
  );
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

  return (
    <form className="">
      {/* user form */}
      <div className="w-full pr-4 space-y-4">
        <div className="">
          <label className="block text-sm font-medium text-gray-700">
            {t("common:general.language")}
          </label>
          <select
            className="border-2 border-gray-200 p-2 rounded-md selection w-1/2 uppercase"
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sorting
          </label>
          <select
            name="sortingSelection"
            id="sortingSelection"
            className="border-2 border-gray-200 p-2 rounded-md selection w-1/2"
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
  );
}

export default Preference;
