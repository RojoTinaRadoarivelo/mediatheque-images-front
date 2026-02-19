export class TagsType {
    id?: string;
    name?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date
}

export type TagDto = {
    name: string;
}