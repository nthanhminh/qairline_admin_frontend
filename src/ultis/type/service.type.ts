export type Service = ServiceDto & {
    id?: string;
}

export type ServiceDto = {
    name?: string;
    imageUrl?: string;
    description?: string;
    type?: EServiceType;
    price?: number;
}

export enum EServiceType {
    CAR = "CAR",
    TAKE_CARE = "TAKE_CARE",
    INSURANCE = "INSURANCE",
    ANIMAL = "ANIMAL",
}