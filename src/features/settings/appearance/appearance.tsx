import { useEffect } from "react";
import {
  Layouts,
  useLayout,
  type LayoutType,
} from "../../../layouts/context/layout.context";
import {
  themes,
  useTheme,
  type ThemeType,
} from "../../../shared/context/themes";
import { useTranslation } from "react-i18next";
import { useUpdatePreference } from "../../../shared/services/preferences.queries";
import { useAuth } from "../../auth/context/auth.context";
import { getMergedPreference } from "../utils/preference.utils";

function Appearance() {
  const { layout, setLayout } = useLayout();
  const { mutate: updatePreference } = useUpdatePreference();
  const { Theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    setTimeout(() => {
      const currentTheme = (localStorage.getItem("Theme") ??
        "Light") as ThemeType;
      setTheme(currentTheme);
    }, 200);
  }, [setTheme]);

  const handleSubmit = () => {
    if (!isAuthenticated || !user?.id) return;

    const savingPreference = getMergedPreference(user.preference, {
      theme: Theme,
      layout,
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
    const currentTheme = (localStorage.getItem("Theme") ?? "Light") as ThemeType;
    setTheme(currentTheme);
    setLayout((localStorage.getItem("layout") ?? "Vertical") as LayoutType);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <p className="text-sm text-slate-600">
          Controle l'affichage global de l'application. Les changements sont
          appliques immediatement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Layout
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Organisation des grilles et sections.
          </p>
          <select
            name="layoutSelection"
            id="layoutSelection"
            className="border border-slate-300 p-2 rounded-md selection w-full"
            value={layout}
            onChange={(e) => setLayout(e.target.value as LayoutType)}
          >
            {Layouts.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <label
            htmlFor="Theme"
            className="block text-sm font-semibold text-slate-700 mb-2"
          >
            Theme
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Ambiance visuelle de l'interface.
          </p>
          <select
            className="border border-slate-300 p-2 rounded-md selection w-full"
            value={Theme}
            onChange={(e) => changeTheme(e.target.value as ThemeType)}
            id="Theme"
          >
            {themes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">
          Etat actuel: <span className="font-medium text-slate-700">{Theme}</span>
          {" | "}
          <span className="font-medium text-slate-700">{layout}</span>
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
            type="button"
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

export default Appearance;
