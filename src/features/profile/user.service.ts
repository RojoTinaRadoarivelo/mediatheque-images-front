import API, { safeApiCall } from "../../shared/utils/apis.util";
import type { UsersType } from "../auth/users.type";
import type { UserDto } from "./DTOs/user.dto";


export class UserService {
    user: UsersType | null = null;

    constructor() { }

    async update(data: UserDto) {
        const userUpdated = await safeApiCall<UsersType | null>(
            API.put(`/users/me`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return { userUpdated };
    }

    async delete(id: string) {
        const userDeleted = await safeApiCall<UsersType | null>(
            API.delete(`/users/${id}`)
        );

        return { userDeleted };
    }
}