import { useEffect, useState } from "react";
import {
  Layouts,
  useLayout,
  type LayoutType,
} from "../../../layouts/context/layout.context";
import { useTheme, type ThemeType } from "../../../shared/context/themes";
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
  const [themeMode, setThemeMode] = useState<ThemeType>("Light");
  const [galleryLayout, setGalleryLayout] = useState<
    "Grid" | "Masonry" | "Compact"
  >("Grid");
  const [imageSize, setImageSize] = useState<"Small" | "Medium" | "Large">(
    "Medium",
  );
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [sidebarPosition, setSidebarPosition] = useState<"Left" | "Right">(
    "Left",
  );

  const changeThemeMode = (mode: ThemeType) => {
    setThemeMode(mode);
    if (mode === "Light" || mode === "Dark") {
      setTheme(mode);
      return;
    }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "Dark"
      : "Light";
    setTheme(systemTheme as ThemeType);
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
    const currentTheme = (localStorage.getItem("Theme") ??
      "Light") as ThemeType;
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
            Theme
          </label>
          <p className="text-xs text-slate-500 mb-3">Light, Dark or System.</p>
          <select
            className="border border-slate-300 p-2 rounded-md selection w-full"
            value={themeMode}
            onChange={(e) => changeThemeMode(e.target.value as ThemeType)}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            App Layout
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
            Gallery Layout
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Grid, Masonry or Compact for feed display.
          </p>
          <select
            className="border border-slate-300 p-2 rounded-md selection w-full"
            value={galleryLayout}
            onChange={(e) =>
              setGalleryLayout(e.target.value as "Grid" | "Masonry" | "Compact")
            }
            id="Theme"
          >
            <option value="Grid">Grid</option>
            <option value="Masonry">Masonry</option>
            <option value="Compact">Compact</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Default Image Size
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Size used in initial gallery render.
          </p>
          <select
            className="border border-slate-300 p-2 rounded-md selection w-full"
            value={imageSize}
            onChange={(e) =>
              setImageSize(e.target.value as "Small" | "Medium" | "Large")
            }
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700">Animations</p>
              <p className="text-xs text-slate-500 mt-1">
                Enable or disable transitions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAnimationsEnabled((prev) => !prev)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                animationsEnabled ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  animationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sidebar Position
            </label>
            <select
              className="border border-slate-300 p-2 rounded-md selection w-full"
              value={sidebarPosition}
              onChange={(e) =>
                setSidebarPosition(e.target.value as "Left" | "Right")
              }
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">
          Etat actuel:{" "}
          <span className="font-medium text-slate-700">{Theme}</span>
          {" | "}
          <span className="font-medium text-slate-700">{layout}</span>
          {" | "}
          <span className="font-medium text-slate-700">{galleryLayout}</span>
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
