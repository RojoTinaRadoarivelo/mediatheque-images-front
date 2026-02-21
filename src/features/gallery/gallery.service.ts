import API, { safeApiCall } from "../../shared/utils/apis.util";
import type { GalleryDto } from "./gallery.type";
import type { PhotoType } from "./photo/photo.type";


export class GalleryService {

    constructor() { }

    async getAllPhotos() {
        const Photos = await safeApiCall<PhotoType[]>(
            API.get(`/gallery/photos`)
        );

        return { Photos };
    }

    async getFilteredPhoto(query: any) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.post(`/gallery/photos-filtered`, query)
        );

        return { Photos };
    }

    async createPhoto(data: GalleryDto) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.post(`/gallery/photos`, data)
        );

        return { Photos };
    }

    async updatePhoto(data: GalleryDto) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.put(`/photos/update`, data)
        );

        return { Photos };
    }

    async moveToBinPhoto(id: string) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.put(`/gallery/photos/moveToBin/${id}`)
        );

        return { Photos };
    }

    async restoreFromBinPhoto(id: string) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.put(`/gallery/photos/restoreFromBin/${id}`)
        );

        return { Photos };
    }

    async deletePhoto(id: string) {
        const Photos = await safeApiCall<PhotoType | null>(
            API.delete(`/gallery/photos/${id}`)
        );

        return { Photos };
    }
}