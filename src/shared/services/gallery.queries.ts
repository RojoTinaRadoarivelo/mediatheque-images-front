import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../features/gallery/gallery.service";
import { MAX_LIST_LIMIT } from "../utils/queryClient";
import type { TagMode } from "@/features/tags/tags.type";

const galleryService = new GalleryService();

export function useGallery(userId: string | undefined, isAuthenticated = false, page: number, limit: number = MAX_LIST_LIMIT, route?: string, search?: string, withTags?: string[], tagMode?: TagMode) {
    return useQuery({
        queryKey: ["photos", userId ?? "all", isAuthenticated, page, route, search, withTags, tagMode, limit],
        queryFn: () => {
            const isAuth = route === "/galleries" ? true : isAuthenticated;
            const trimmedSearch = search?.trim() ?? "";
            const hasSearch = Boolean(trimmedSearch);
            const hasTags = Boolean(withTags && withTags.length > 0);
            const effectiveTagNames = hasTags
                ? withTags
                : hasSearch
                    ? [trimmedSearch]
                    : undefined;
            const effectiveTagMode = hasTags
                ? (tagMode ?? undefined)
                : hasSearch
                    ? "search"
                    : undefined;
            const queryParams: any = {
                userId: userId ?? undefined,
                isAuthentified: isAuth,
                title: hasSearch ? trimmedSearch : undefined,
                name: hasSearch ? trimmedSearch : undefined,
                tagNames: effectiveTagNames,
                tagMode: effectiveTagMode,
            };

            if (hasSearch || hasTags) {
                return galleryService.getFilteredPhoto(queryParams, +page, +limit);
            } else if (userId && isAuthenticated) {
                return galleryService.getFilteredPhoto(queryParams, +page, +limit);
            } else {
                return galleryService.getAllPhotos(+page, +limit);
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
