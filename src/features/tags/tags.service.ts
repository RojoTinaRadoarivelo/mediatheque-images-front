import API, { safeApiCall } from "../../shared/utils/apis.util";
import type { TagDto, TagsType } from "./tags.type";


export class TagService {

    tags: TagsType[] = [];

    constructor() { }

    async getAllTags() {
        const tags = await safeApiCall<TagsType[]>(
            API.get(`/tags`)
        );

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