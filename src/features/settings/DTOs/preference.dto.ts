import type { LanguageListType } from "../../../assets/i18n";
import type { LayoutType } from "../../../layouts/context/layout.context";
import type { ThemeType } from "../../../shared/context/themes";

export type visibilityProfile = "Public" | "Private";
export type sortingType = "Default" | "Trending" | "Recent";
export const sortings: string[] = ["Default", "Trending", "Recent"];
export const visibilities: string[] = ["Public", "Private"];


export type UserPreferenceDto = {
    user_id: string;
    preferences: PreferenceJSON;

}

export type PreferenceJSON = {
    language: LanguageListType,
    layout: LayoutType,
    theme: ThemeType,
    predispositions: {
        sorting: sortingType
    },
    notifications: {
        newLikes: boolean,
        newFollower: boolean
    },
    privacy: {
        profileVisibility: visibilityProfile,
        showLikes: boolean,
        showDownloadCount: boolean
    }


}

export function getDefaultPreference(): PreferenceJSON {
    return {
        language: (localStorage.getItem("lng") as LanguageListType) || "en",
        layout: (localStorage.getItem("layout") as LayoutType) || "Vertical",
        theme: (localStorage.getItem("Theme") as ThemeType) || "Light",
        predispositions: {
            sorting: (localStorage.getItem("sort") as sortingType) || "Default",
        },
        notifications: {
            newLikes: false,
            newFollower: false,
        },
        privacy: {
            profileVisibility:
                (localStorage.getItem("visibility") as visibilityProfile) || "Public",
            showLikes: false,
            showDownloadCount: false,
        },
    };
}
