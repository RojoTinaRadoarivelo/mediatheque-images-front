import type { ApiResult } from "../../../shared/interfaces/api-response.interface";
import API, { safeApiCall } from "../../../shared/utils/apis.util";
import type { SigninDto, SignupDto, UsersType } from "../users.type";

export class AuthService {
    userSigned: UsersType | null = null;

    constructor() { }

    async refreshToken() {
        const session = await safeApiCall<{ sess_id: string }>(
            API.post(`/auth/refresh`, { sess_id: localStorage.getItem('SESS_ID') })
        );
        if (session.data?.sess_id) {
            localStorage.setItem('SESS_ID', session.data.sess_id);
        }


        const searchUser = await this.reloadUserInfo();

        return { session, searchUser };
    }

    async logIn(data: SigninDto) {
        const session = await safeApiCall<{ sess_id: string }>(
            API.post(`/auth/sign-in`, data)
        );
        if (session.data?.sess_id) {
            localStorage.setItem('SESS_ID', session.data.sess_id);
        }


        const searchUser = await this.reloadUserInfo();


        return { session, searchUser };


    }
    async SignUp(data: SignupDto) {
        const session = await safeApiCall<{ sess_id: string }>(
            API.post(`/auth/sign-up`, data)
        );
        if (session.data?.sess_id) {
            localStorage.setItem('SESS_ID', session.data.sess_id);
        }


        const searchUser = await this.reloadUserInfo();


        return { session, searchUser };
    }
    async logOut() {
        this.resetUserData();
        const userSignout = await safeApiCall<{ sess_id: string }>(
            API.post(`/auth/sign-out`, {})
        );
        window.localStorage.removeItem("SESS_ID")

        return { userSignout }
    }

    async reloadUserInfo(): Promise<ApiResult<any>> {
        return safeApiCall<any>(API.get(`/users/info`))
    }

    private resetUserData() {
        this.userSigned = null;
    }

    async sendEmailVerification(email: string) {
        const verifiedEmail = await safeApiCall<any>(API.post(`/auth/send-verification-code`, { email }))
        return { verifiedEmail };
    }


}