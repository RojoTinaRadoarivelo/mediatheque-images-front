import type { ApiResult } from "../../../shared/interfaces/api-response.interface";
import API, { safeApiCall } from "../../../shared/utils/apis.util";
import type { SigninDto, SignupDto, UsersType } from "../users.type";

export class UserService {

    users: UsersType[] = [];
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

    getUsers() { }
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
    SignUp(data: SignupDto) { }
    RemoveUser(id: string) { }
    logOut() {
        this.resetUserData();
        window.localStorage.removeItem("SESS_ID")
        window.location.replace("/");
        window.location.reload();
    }

    async reloadUserInfo(): Promise<ApiResult<any>> {
        return safeApiCall<any>(API.get(`/users/info`))
    }

    private resetUserData() {
        this.userSigned = null;
        this.users = [];
    }


}