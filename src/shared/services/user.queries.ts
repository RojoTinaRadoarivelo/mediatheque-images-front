import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../../features/profile/user.service";
import { useAuth } from "../../features/auth/context/auth.context";


const userService = new UserService();

export function useUpdateUser() {
    const { refreshingUserData } = useAuth();

    return useMutation({
        mutationFn: (data: FormData) =>
            userService.update(data as any),

        onSuccess: async () => {
            await refreshingUserData();
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();
    const { refreshingUserData } = useAuth();

    return useMutation({
        mutationFn: (id: string) =>
            userService.delete(id),
        onSuccess: async () => {
            await refreshingUserData();
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "photos"
            });
        },
    });
}