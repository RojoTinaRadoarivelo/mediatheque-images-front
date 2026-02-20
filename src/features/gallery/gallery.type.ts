export class GalleryType {
    id?: string;
    photo?: {
        name: string;
        path: string;
    };
    tag?: {
        name: string;
    };
    user?: {
        userName: string;
        email: string;
    };
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date
}

export type GalleryDto = {
    name: string;
    path: string;
    tags_id: string[],
    user_id: string;
    photo_id?: string;
}