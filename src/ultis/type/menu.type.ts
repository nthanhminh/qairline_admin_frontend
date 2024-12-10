export type MenuDto = {
    name?: string;
    description?: string;
    thumbnail?: string;
    price?: number;
    type?: EMenuType;
}

export type Menu = MenuDto & {
    id?: string;
}

export enum EMenuType {
    FOOD = "FOOD",
    DRINK = "DRINK",
}