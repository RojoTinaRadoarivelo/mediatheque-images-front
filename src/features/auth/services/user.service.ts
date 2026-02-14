import API, { safeApiCall } from "../../../shared/utils/apis.util";
import type { SigninDto, SignupDto, UsersType } from "../users.type";

export class UserService {

    users: UsersType[] = [];
    userSigned: UsersType | null = null;
    private isAuthenticated = false;

    constructor() { }

    async refreshToken() {
        return await API.post(
            `/auth/refresh`,
            { sess_id: localStorage.getItem('SESS_ID') }
        );
    }

    getUsers() { }
    async logIn(data: SigninDto) {
        const session = await safeApiCall<{ sess_id: string }>(
            API.post(`/auth/sign-in`, data)
        );
        console.log("user session =", session);

        if (session.data?.sess_id) {
            localStorage.setItem('SESS_ID', session.data.sess_id);
        }

        // Appel infos utilisateur “safe”
        const searchUser = await safeApiCall<any>(API.get(`/users/info`));
        console.log("user found =", searchUser);
        this.userSigned = searchUser.data ?? null;

        this.isAuthenticated = session.success;

        // On renvoie toujours un objet uniforme
        return { session, searchUser };


    }
    SignUp(data: SignupDto) { }
    RemoveUser(id: string) { }
    logOut() {
        this.resetUserData();
        window.localStorage.clear();
        window.location.replace("/");
        window.location.reload();
    }

    private resetUserData() {
        this.userSigned = null;
        this.users = [];
    }


}