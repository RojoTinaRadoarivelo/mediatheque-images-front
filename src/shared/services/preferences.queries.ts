import { useMutation } from "@tanstack/react-query";
import { UserPreferenceService } from "../../features/settings/user-preferences.service";
import { useAuth } from "../../features/auth/context/auth.context";
import type { UserPreferenceDto } from "../../features/settings/DTOs/preference.dto";


const userPreferenceService = new UserPreferenceService();


export function useUpdatePreference() {
    const { user, refreshingUserData } = useAuth();

    return useMutation({
        mutationFn: (data: UserPreferenceDto) =>
            user?.preference ?
                userPreferenceService.updatePreference(user.preference?.id ?? null, data) :
                userPreferenceService.updatePreference(null, data),

        onSuccess: async () => {
            await refreshingUserData();
        },
    });
}
