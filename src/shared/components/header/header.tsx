import "./Header.scss";
import {
  Layouts,
  useLayout,
  type LayoutType,
} from "../../../layouts/context/layout.context";
import User from "../../../features/auth/user/user";
import { useEffect, useState } from "react";
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
import ToggleSwitch from "../ui/custom-switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const languageOptions: Record<
  LanguageListType,
  { label: string; flag: string }
> = {
  en: { label: "EN", flag: "/flags/EN.svg" },
  fr: { label: "FR", flag: "/flags/FR.svg" },
  mg: { label: "MG", flag: "/flags/MG.svg" },
};

function Header() {
  const { layout, setLayout } = useLayout();
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");
  const { Theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { mutate: updatePreference } = useUpdatePreference();
  const languages: LanguageListType[] = LanguageList;

  const ModalContent = activeModal ? ModalMapping[activeModal] : null;
  const showLayoutSelect = location.pathname === "/home";
  const language = (i18n.language as LanguageListType) ?? "en";
  const activeLanguageOption = languageOptions[language];

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

  const changeThemeMode = (mode: ThemeType) => {
    setTheme(mode);
    savePreferencePatch({ theme: mode });
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/90 text-foreground shadow-sm shadow-black/5 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full max-w-[90rem] px-3 md:px-5 py-2 md:py-2.5 flex items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-2 min-w-fit"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-xs font-bold">
            M
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold leading-none">
              Mediatheque
            </p>
            <p className="text-[11px] text-muted-foreground leading-none mt-1">
              Photo platform
            </p>
          </div>
        </button>

        <div className="flex-1">
          <div className="flex h-10 items-center rounded-xl border border-border bg-muted px-3 focus-within:ring-2 focus-within:ring-ring">
            <span className="text-muted-foreground mr-2 text-sm">Find</span>
            <input
              type="text"
              placeholder={t("general.search")}
              className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => onEnterPressed(e)}
            />
            <Button
              type="button"
              size="sm"
              className="button-reset ml-2 h-8 px-3.5 rounded-lg"
              onClick={searchGallery}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            type="button"
            onClick={() => navigate("/home")}
            variant="outline"
            size="sm"
            className="button-reset h-8 rounded-lg px-3 text-xs font-medium"
          >
            Explore
          </Button>
          {isAuthenticated && (
            <>
              <Button
                type="button"
                onClick={() => navigate("/galleries")}
                variant="outline"
                size="sm"
                className="button-reset h-8 rounded-lg px-3 text-xs font-medium"
              >
                Gallery
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/profile")}
                variant="outline"
                size="sm"
                className="button-reset h-8 rounded-lg px-3 text-xs font-medium"
              >
                Profile
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center px-1">
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

          <Select
            value={language}
            onValueChange={(value) => changeLanguage(value as LanguageListType)}
          >
            <SelectTrigger className="h-8 min-w-[76px] border-border bg-background text-[11px]">
              <SelectValue>
                <span className="inline-flex items-center gap-2">
                  <img
                    src={activeLanguageOption.flag}
                    alt={activeLanguageOption.label}
                    className="w-4 h-4 rounded-sm"
                  />
                  {activeLanguageOption.label}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((el) => (
                <SelectItem key={el} value={el}>
                  <span className="inline-flex items-center gap-2">
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

          {showLayoutSelect && (
            <div className="hidden md:block">
              <Select value={layout} onValueChange={changeLayout}>
                <SelectTrigger className="h-8 min-w-[92px] border-border bg-background text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Layouts.map((el) => (
                    <SelectItem key={el} value={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="button-reset w-8 h-8 rounded-lg text-muted-foreground"
            onClick={() => navigate("faq")}
            title="FAQ"
          >
            ?
          </Button>

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
