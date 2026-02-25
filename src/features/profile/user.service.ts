import API, { safeApiCall } from "../../shared/utils/apis.util";
import type { UsersType } from "../auth/users.type";
import type { UserDto } from "./DTOs/user.dto";


export class UserService {
    user: UsersType | null = null;

    constructor() { }

    async update(id: string, data: UserDto) {
        const userUpdated = await safeApiCall<UsersType | null>(
            API.put(`/users/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return { userUpdated };
    }

    async deleteTag(id: string) {
        const userDeleted = await safeApiCall<UsersType | null>(
            API.delete(`/users/${id}`)
        );

        return { userDeleted };
    }
}