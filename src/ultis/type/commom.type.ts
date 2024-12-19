export type DataApiResponse<T> = {
    data: T
}

export type DataGroupByType<T> = {
    type: string;
    items: T[];
}

export type FindAllApiResponse<T> = {
    count: number;
    items: T[];
}

export enum EEnvironmentLogin {
    APP_ADMIN = "APP_ADMIN",
    USER = "APP_USER",
}