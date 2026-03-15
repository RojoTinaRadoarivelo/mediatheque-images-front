import API, { safeApiCall } from "../../shared/utils/apis.util";
import type { UsersType } from "../auth/users.type";
import type { UserPreferenceDto } from "./DTOs/preference.dto";
import type { UserPreferences } from "./user-preference.type";


export class UserPreferenceService {
    userPreference: UserPreferences | null = null;
    constructor() {

    }


    // preferences
    async updatePreference(id: string | null, data: UserPreferenceDto) {
        let userPreference: any;
        if (id) {
            userPreference = await safeApiCall<UsersType | null>(
                API.put(`/user-preferences/${id}`, data)
            );
        } else {
            userPreference = await safeApiCall<UsersType | null>(
                API.post(`/user-preferences`, data)
            );
        }

        return { userPreference };
    }
}