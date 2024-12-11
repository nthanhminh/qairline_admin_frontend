export enum SortBy {
    DESC_PRICE = "DESC_PRICE",
    ASC_PRICE = "ASC_PRICE",
    DESC_DEPARTURE_TIME = "DESC_DEPARTURE_TIME",
    ASC_DEPARTURE_TIME = "ASC_DEPARTURE_TIME",
}

export const SortByRender = {
    "ASC_PRICE": "Cheapest",
    "DESC_PRICE": "Most expensive",
    "DESC_DEPARTURE_TIME": "Latest",
    "ASC_DEPARTURE_TIME": "Eearliest",
}

export const FlightStatusRender = {
    "DONE": 'Done',
    "ACTIVE": 'Active',
    "CANCELLED": 'Cancelled',
    "DELAYED": 'Delayed',
}

export enum EFlightStatus {
    DONE = "DONE",
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    DELAYED = "DELAYED",
}