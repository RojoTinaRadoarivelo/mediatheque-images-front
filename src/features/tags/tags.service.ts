import type { ApiResult } from "../../shared/interfaces/api-response.interface";
import API, { safeApiCall } from "../../shared/utils/apis.util";
import { MAX_LIST_LIMIT } from "../../shared/utils/queryClient";
import type { TagDto, TagsType } from "./tags.type";


export class TagService {

    constructor() { }

    async getAllTags(page?: number, limit: number = MAX_LIST_LIMIT) {
        let tags: ApiResult<TagsType[]>
        if (!page || page === 0) {
            tags = await safeApiCall<TagsType[]>(
                API.get(`/tags`)
            );
        } else {
            tags = await safeApiCall<TagsType[]>(
                API.get(`/tags?page=${page}&limit=${limit}`)
            );
        }


        return { tags };
    }

    async getOneTag(id: string) {
        const tags = await safeApiCall<TagsType | null>(
            API.get(`/tags/${id}`)
        );

        return { tags };
    }

    async createTag(data: TagDto) {
        const tags = await safeApiCall<TagsType | null>(
            API.post(`/tags`, data)
        );

        return { tags };
    }

    async updateTag(id: string, data: TagDto) {
        const tags = await safeApiCall<TagsType | null>(
            API.post(`/tags/${id}`, data)
        );

        return { tags };
    }

    async deleteTag(id: string) {
        const tags = await safeApiCall<TagsType | null>(
            API.delete(`/tags/${id}`)
        );

        return { tags };
    }

}