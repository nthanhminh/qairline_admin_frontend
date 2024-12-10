import { Airport } from "./airport.type";

export type NewsDto = {
    id?: string
    title?: string
    content?: string;
    percentDiscount?: number | null,
    cashDiscount?: number | null,
    imageUrl?: string
    type?: ENewsType,
    endTime?: string | null,
    airports?: Airport[],
    airportIds?: string[],
}

export type News = NewsDto & {
    id?: string;
}

export enum ENewsType {
    NEWS = "NEWS",
    DISCOUNT = "DISCOUNT",
}