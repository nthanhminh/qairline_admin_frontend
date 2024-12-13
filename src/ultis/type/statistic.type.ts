import { Ticket } from "./flight.type";

export type FlightStatisticDashboard = {
    [key: string]: FlightStatisticResult;
}

export type FlightStatisticResult = {
    flightsThisMonth: number,
    diffrentLastMonth: number,
}

export type FlightChartData = {
    month: string,
    totalFlights: number,
}  

export type TicketChartData = {
    period: string,
    totalTickets: number,
}

export type FlightStatisticByAirportData = {
    fromairportcode: string,
    fromairportname: string,
    toairportcode: string,
    toairportname: string,
    totalflights: number,
}

export type BookingStatisticDetails = {
    flightid: string,
    flightcode: string,
    departuretime: string,
    duration: number,
    arrivaltime: string,
    fromairportname: string,
    toairportname: string,
    fromairportcode: string,
    toairportcode: string,
    flighttickets: Ticket[]
}

export enum ETimeType {
    WEEK = "WEEK",
    MONTH = "MONTH",
    YEAR = "YEAR",
}