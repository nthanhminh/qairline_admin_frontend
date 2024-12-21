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
    BAGGAGE = "BAGGAGE",
    INSURANCE = "INSURANCE",
    ANIMAL = "ANIMAL",
}