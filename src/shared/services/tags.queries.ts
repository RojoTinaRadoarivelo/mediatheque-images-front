import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TagService } from "../../features/tags/tags.service";


const tagService = new TagService();

export function useTags(page: number) {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => tagService.getAllTags(+page),
        staleTime: 5 * 60 * 1000, // 5 min
    });
}


export function useCreateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { name: string }) =>
            tagService.createTag(data),

        onSuccess: () => {
            // 🔥 refresh automatique de useTags
            queryClient.invalidateQueries({
                queryKey: ["tags"],
            });
        },
    });
}
