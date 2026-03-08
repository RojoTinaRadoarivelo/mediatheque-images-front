import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// en
import enCommon from "./en/common.json";
import enSettings from "./en/settings.json";
import enGallery from "./en/gallery.json";
import enProfile from "./en/profile.json";
import enFaq from "./en/faq.json";
// fr
import frCommon from "./fr/common.json";
import frSettings from "./fr/settings.json";
import frGallery from "./fr/gallery.json";
import frProfile from "./fr/profile.json";
import frFaq from "./fr/faq.json";

// languages list
export type LanguageListType = "en" | "fr";
export const LanguageList = ["en", "fr"];

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon,
                settings: enSettings,
                gallery: enGallery,
                profile: enProfile,
                faq: enFaq
            },
            fr: {
                common: frCommon,
                settings: frSettings,
                gallery: frGallery,
                profile: frProfile,
                faq: frFaq
            },
        },
        lng: localStorage.getItem("lng") || "en",
        fallbackLng: "en",
        ns: ["common"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;