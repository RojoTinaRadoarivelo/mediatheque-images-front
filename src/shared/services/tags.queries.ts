import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TagService } from "../../features/tags/tags.service";
import { MAX_LIST_LIMIT } from "../utils/queryClient";


const tagService = new TagService();

export function useTags(
    page: number,
    options?: {
        limit?: number;
    },
) {
    const limit = options?.limit ?? MAX_LIST_LIMIT;
    return useQuery({
        queryKey: ["tags", page, limit],
        queryFn: () => tagService.getAllTags(+page, limit),
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
                predicate: (query) => query.queryKey[0] === "tags",
            });
        },
    });
}
