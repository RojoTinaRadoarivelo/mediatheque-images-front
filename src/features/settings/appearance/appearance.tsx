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
import ToggleSwitch from "../../../shared/components/ui/custom-switch";

function Appearance() {
  const { layout, setLayout } = useLayout();
  const { mutate: updatePreference } = useUpdatePreference();
  const { Theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
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
  const selectClassName =
    "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  const changeThemeMode = (mode: ThemeType) => {
    setTheme(mode);
  };

  useEffect(() => {
    const currentTheme = (localStorage.getItem("Theme") ?? "Light") as ThemeType;
    setTheme(currentTheme);
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
          <p className="text-xs text-slate-500 mb-3">Switch between Light and Dark.</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {Theme === "Dark" ? "Dark" : "Light"}
            </span>
            <ToggleSwitch
              checked={Theme === "Dark"}
              onChange={(checked) =>
                changeThemeMode(checked ? "Dark" : "Light")
              }
              offLabel="☀️"
              onLabel="🌙"
              trackBg="bg-neutral-900"
              thumbBg="bg-white"
              offLabelColor="text-yellow-300"
              onLabelColor="text-slate-200"
              width={40}
              height={22}
              thumbSize={16}
            />
          </div>
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
            className={selectClassName}
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
            className={selectClassName}
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
            className={selectClassName}
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
            <ToggleSwitch
              checked={animationsEnabled}
              onChange={setAnimationsEnabled}
              trackBg={animationsEnabled ? "bg-blue-600" : "bg-slate-300"}
              thumbBg="bg-white"
              width={44}
              height={24}
              thumbSize={18}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Sidebar Position
            </label>
            <select
              className={selectClassName}
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
