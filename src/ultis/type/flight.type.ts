import { StringLiteral } from "typescript";
import { Airport } from "./airport.type";

export type Flight = {
    id?: string;
    departureAirport?: Airport
    flightCode?: string;
    fromAirport?: Airport
    toAirport?: Airport; 
    departureTime?: string;  
    duration?: number;
    plane?: Plane;
    flightsPrice?: FlightPrice[]
};

export type Plane = {
    id?: string;
    name?: string;
    type?: string;
    description?: string;
    seatLayoutId?: SeatLayout
}

export type SeatLayout = {
    id?: string;
    planeType?: string;
    numberOfBusinessSeats?: number;
    numberOfPreminumEconomySeats?: number;
    numberOfEconomySeats?: number;
    numberOfBasicSeats?: number;
    seatLayoutForPlaneType?: JSON
}

export type FlightPrice = {
    id?: string;
    price?: number;
    seatClassInfo?: JSON
}

export type FlightDto = {
    name: string;
    flightCode: string;
    departureTime: string;
    duration: string;
    planeId: string;
    fromAirportId: string;
    toAirportId: string;
    window_seat_price: number;
    aisle_seat_price: number;
    exit_row_seat_price: number;
}

export type PriceSeatClassForFlight = {
    
}