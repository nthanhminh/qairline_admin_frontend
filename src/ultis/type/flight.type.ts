import { StringLiteral } from "typescript";
import { Airport } from "./airport.type";
import { EFlightStatus } from "@/components/flight/enums";

export type Flight = {
    id?: string;
    name?: string;
    departureAirport?: Airport
    flightCode?: string;
    fromAirport?: Airport
    toAirport?: Airport; 
    departureTime?: string;  
    duration?: number;
    plane?: Plane;
    status?: EFlightStatus;
    window_seat_price: number;
    aisle_seat_price: number;
    exit_row_seat_price: number;
    flightsPrice?: FlightPrice[],
    bookings: Booking[];
};

export type Booking = {
    id?: string;
    bookingDate?: string;
    status?: EBookingStatus;
    tickets?: Ticket[];
}

export type Ticket = {
    id?: string;
    price?: string,
    customerName?: string,
    customerType?: string,
    customerSSID?: string,
    customerEmail?: string,
    seatValue?: string,
    seatClass?: string,
    status?: string,
    checkinStatus?: string
}

export enum EBookingStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
}

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
    seatClassInfo?: SeatClassInfo
}

export type SeatClassInfo = {
    name?: ESeatClass,
    seatClassInfo: JSON
}

export type FlightDto = UpdatePriceDto & CreateFLightDto;

export type UpdatePriceDto = {
    business_price: number;
    premium_economy_price: number;
    economy_price: number;
    basic_economy_price: number;
}

export type CreateFLightDto = {
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

export type PriceData = {
    price: number;
    seatClass: string;
}

export type PriceDataId = PriceData & {
    id: string;
}

export enum ESeatClass {
    BUSINESS = "BUSINESS",
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY",
    ECONOMY = "ECONOMY",
    BASIC_ECONOMY = "BASIC_ECONOMY"
}