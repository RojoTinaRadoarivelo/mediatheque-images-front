export class UsersType {
    id?: string;
    email?: string;
    avatar?: string;
    userName?: string;

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