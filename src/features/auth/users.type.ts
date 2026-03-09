import type { PreferenceJSON } from "../settings/DTOs/preference.dto";

export type UserPreferenceType = PreferenceJSON & {
    id?: string;
};

export class UsersType {
    id?: string;
    email?: string;
    avatar?: string;
    userName?: string;
    preference?: UserPreferenceType | null;

}

export type SigninDto = {
    email: string;
    password: string;
}

export type SignupDto = {
    email: string;
    password: string;
    code: string;
}
