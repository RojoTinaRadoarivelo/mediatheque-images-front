import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../features/gallery/gallery.service";
import { MAX_LIST_LIMIT } from "../utils/queryClient";

const galleryService = new GalleryService();

export function useGallery(userId: string | undefined, isAuthenticated = false, page: number, route?: string, search?: string, withTags?: string[]) {
    return useQuery({
        queryKey: ["photos", userId ?? "all", isAuthenticated, page, route, search, withTags],
        queryFn: () => {
            const isAuth = route === "/galleries" ? true : isAuthenticated;
            const queryParams: any = {
                userId: userId ?? undefined,
                isAuthentified: isAuth,
                title: search || undefined,
                name: search || undefined,
                tagNames: withTags && withTags.length > 0 ? withTags : search ? [search] : undefined,
                page,
                limit: MAX_LIST_LIMIT,
            };

            if (search || (withTags && withTags.length > 0)) {
                return galleryService.getFilteredPhoto(queryParams);
            } else if (userId && isAuthenticated) {
                return galleryService.getFilteredPhoto(queryParams);
            } else {
                return galleryService.getAllPhotos(page);
            }
        },
        staleTime: 5 * 60 * 1000, // 5 min    
    });
}

export function useCreatePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.createPhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "photos"
            });
            // queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
        },
    });
}

export function useUpdatePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.updatePhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "photos"
            });
            // queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
        },
    });
}

export function useDeletePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            galleryService.deletePhoto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === "photos"
            });
            // queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
        },
    });
}

export function useDownloadPhoto() {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await galleryService.downloadPhoto(id);

            // Nom du fichier depuis Content-Disposition
            const disposition = response.headers['content-disposition'];
            console.log(disposition);

            let fileName = 'photo.jpg'; // fallback

            if (disposition) {
                const matches = disposition.match(/filename="?(.+?)"?$/);
                if (matches && matches[1]) {
                    fileName = matches[1].split(/[/\\]/).pop()!;
                }
            }

            // Blob avec type MIME exact
            const contentType = response.headers['content-type'] || 'application/octet-stream';
            const blob = new Blob([response.data], { type: contentType });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; // Photo-xxx.png
            a.click();
            window.URL.revokeObjectURL(url);
        },
    });
}
