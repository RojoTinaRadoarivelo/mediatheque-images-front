import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryService } from "../../features/gallery/gallery.service";
import { useAuth } from "../../features/auth/context/auth.context";

const galleryService = new GalleryService();

export function useGallery(userId: string | undefined, isAuthenticated = false, page: number, route?: string) {
    return useQuery({
        queryKey: ["photos", userId ?? "all", page, route],
        queryFn: () => isAuthenticated && userId ? galleryService.getFilteredPhoto({ userId }) : galleryService.getAllPhotos(+page),
        staleTime: 5 * 60 * 1000, // 5 min
    });
}

export function useCreatePhoto() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.createPhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
        },
    });
}

export function useUpdatePhoto() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: (data: FormData) =>
            galleryService.updatePhoto(data as any),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
        },
    });
}

export function useDeletePhoto() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: (id: string) =>
            galleryService.deletePhoto(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos", user?.id ?? "all"] });
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