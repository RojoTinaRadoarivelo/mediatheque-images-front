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

type PreferenceJSON = {
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