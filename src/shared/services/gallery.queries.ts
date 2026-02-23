import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../features/gallery/gallery.service";

const galleryService = new GalleryService();

export function useGallery(page: number) {
    return useQuery({
        queryKey: ["photos"],
        queryFn: () => galleryService.getAllPhotos(+page),
        staleTime: 5 * 60 * 1000, // 5 min
    });
}

export function useCreatePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.createPhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos"] });
        },
    });
}

export function useUpdatePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.updatePhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos"] });
        },
    });
}

export function useDeletePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            galleryService.deletePhoto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos"] });
        },
    });
}