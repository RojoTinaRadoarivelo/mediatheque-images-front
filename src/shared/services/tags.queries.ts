import { useQuery } from "@tanstack/react-query";
import { TagService } from "../../features/tags/tags.service";


const tagService = new TagService();

export function useTags(page: number) {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => tagService.getAllTags(+page),
        staleTime: 5 * 60 * 1000, // 5 min
    });
}
