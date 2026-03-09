import "./Header.scss";
import {
  Layouts,
  useLayout,
  type LayoutType,
} from "../../../layouts/context/layout.context";
import User from "../../../features/auth/user/user";
import { useEffect, useMemo, useState } from "react";
import { ModalMapping, type ModalKey } from "../../utils/modals.type";
import Modal from "../modals/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n, {
  LanguageList,
  type LanguageListType,
} from "../../../assets/i18n";
import { useTheme, type ThemeType } from "../../context/themes";
import { useUpdatePreference } from "../../services/preferences.queries";
import { useAuth } from "../../../features/auth/context/auth.context";
import { getMergedPreference } from "../../../features/settings/utils/preference.utils";

const languageOptions: Record<
  LanguageListType,
  { label: string; flag: string }
> = {
  en: { label: "EN", flag: "🇺🇸" },
  fr: { label: "FR", flag: "🇫🇷" },
  mg: { label: "MG", flag: "🇲🇬" },
};

function Header() {
  const { layout, setLayout } = useLayout();
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");
  const { setTheme } = useTheme();
  const [themeMode, setThemeMode] = useState<ThemeType>(
    () => (localStorage.getItem("Theme") as ThemeType) ?? "Light",
  );
  const { user, isAuthenticated } = useAuth();
  const { mutate: updatePreference } = useUpdatePreference();
  const languages: LanguageListType[] = LanguageList;

  const ModalContent = activeModal ? ModalMapping[activeModal] : null;
  const showLayoutSelect = location.pathname === "/home";
  const language = (i18n.language as LanguageListType) ?? "en";
  const sliderPositionClass = useMemo(() => {
    if (themeMode === "Dark") return "translate-x-0";
    return "translate-x-[74px]";
  }, [themeMode]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        pathname: location.pathname,
        search: search.trim() ? `?q=${encodeURIComponent(search)}` : "",
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [location.pathname, navigate, search]);

  const searchGallery = () => {
    navigate({
      pathname: location.pathname === "/galleries" ? "/galleries" : "/home",
      search: search ? `?q=${encodeURIComponent(search)}` : "",
    });
  };

  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchGallery();
    }
  };

  const savePreferencePatch = (
    patch: Partial<{
      language: LanguageListType;
      theme: ThemeType;
      layout: LayoutType;
    }>,
  ) => {
    if (!isAuthenticated || !user?.id) return;
    const savingPreference = getMergedPreference(user.preference, patch);
    updatePreference({ user_id: user.id, preferences: savingPreference });
  };

  // const resolveSystemTheme = (): ThemeType =>
  //   window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light";

  const changeThemeMode = (mode: ThemeType) => {
    setThemeMode(mode);
    localStorage.setItem("Theme", mode);

    const resolvedTheme = mode as ThemeType;
    setTheme(resolvedTheme);
    savePreferencePatch({ theme: resolvedTheme });
  };

  const changeLanguage = (lang: LanguageListType) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
    savePreferencePatch({ language: lang });
  };

  const changeLayout = (newLayout: string) => {
    setLayout(newLayout as LayoutType);
    savePreferencePatch({ layout: newLayout as LayoutType });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-7xl px-3 md:px-5 py-2.5 flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 min-w-fit"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white grid place-items-center text-xs font-bold">
            M
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              Mediatheque
            </p>
            <p className="text-[11px] text-slate-500 leading-none mt-1">
              Photo platform
            </p>
          </div>
        </button>

        <div className="flex-1">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-slate-400 mr-2 text-xs">Find</span>
            <input
              type="text"
              placeholder={t("general.search")}
              className="w-full bg-transparent text-sm outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => onEnterPressed(e)}
            />
            <button
              type="button"
              className="ml-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs hover:bg-slate-700"
              onClick={searchGallery}
            >
              Search
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 hover:bg-slate-100"
          >
            Explore
          </button>
          {isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => navigate("/galleries")}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 hover:bg-slate-100"
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 hover:bg-slate-100"
              >
                Profile
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-[112px] h-9 rounded-lg border border-slate-200 bg-slate-100 p-1">
            <div
              className={`absolute top-1 left-1 w-[35px] h-7 rounded-md bg-white border border-slate-200 transition-transform ${sliderPositionClass}`}
            />
            <div className="relative z-10 flex items-center">
              <button
                type="button"
                className="w-[35px] h-7 text-[11px] text-slate-600"
                onClick={() => changeThemeMode("Dark")}
                title="Dark"
              >
                D
              </button>
              <button
                type="button"
                className="w-[35px] h-7 text-[11px] text-slate-600"
                onClick={() => changeThemeMode("Light")}
                title="Light"
              >
                L
              </button>
            </div>
          </div>

          <select
            className="border border-slate-200 p-2 rounded-lg text-xs bg-white"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as LanguageListType)}
          >
            {languages.map((el) => (
              <option key={el} value={el}>
                {languageOptions[el].flag} {languageOptions[el].label}
              </option>
            ))}
          </select>

          {showLayoutSelect && (
            <select
              name="layoutSelection"
              id="layoutSelection"
              className="hidden md:block border border-slate-200 p-2 rounded-lg text-xs bg-white"
              value={layout}
              onChange={(e) => changeLayout(e.target.value)}
            >
              {Layouts.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            className="w-9 h-9 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 inline-flex items-center justify-center leading-none"
            onClick={() => navigate("faq")}
            title="FAQ"
          >
            ?
          </button>

          <User openModal={setActiveModal}></User>
          <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)}>
            {ModalContent && (
              <ModalContent
                closeModal={() => setActiveModal(null)}
                switchModal={(key: ModalKey) => setActiveModal(key)}
              />
            )}
          </Modal>
        </div>
      </div>
    </header>
  );
}

export default Header;
