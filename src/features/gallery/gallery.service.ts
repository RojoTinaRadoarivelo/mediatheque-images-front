import type { ApiResult } from "../../shared/interfaces/api-response.interface";
import API, { safeApiCall } from "../../shared/utils/apis.util";
import { MAX_LIST_LIMIT } from "../../shared/utils/queryClient";
import type { GalleryDto, GalleryType } from "./gallery.type";


export class GalleryService {

    constructor() { }

    async getAllPhotos(page?: number, limit: number = MAX_LIST_LIMIT) {
        let Photos: ApiResult<GalleryType[]>
        if (!page || page === 0) {
            Photos = await safeApiCall<GalleryType[]>(
                API.get(`/gallery/photos`)
            );
        } else {
            Photos = await safeApiCall<GalleryType[]>(
                API.get(`/gallery/photos?page=${page}&limit=${limit}`)
            );
        }

        return { Photos };
    }

    async getFilteredPhoto(query: any) {
        const Photos = await safeApiCall<GalleryType | null>(
            API.post(`/gallery/photos-filtered`, query)
        );

        return { Photos };
    }

    async createPhoto(data: GalleryDto) {
        const Photos = await safeApiCall<GalleryType | null>(
            API.post(`/gallery/photos`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return { Photos };
    }

    async updatePhoto(data: GalleryDto) {
        const Photos = await safeApiCall<GalleryType | null>(
            API.put(`/photos/update`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return { Photos };
    }


    async deletePhoto(id: string) {
        const Photos = await safeApiCall<GalleryType | null>(
            API.delete(`/gallery/photos/${id}`)
        );

        return { Photos };
    }
}