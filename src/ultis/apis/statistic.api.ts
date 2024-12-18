import { baseUrl } from "../constants"
import { DataApiResponse } from "../type/commom.type"
import { BookingStatisticDetails, ETimeType, FlightChartData, FlightStatisticByAirportData, FlightStatisticDashboard, TicketChartData } from "../type/statistic.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getFlightDataDashboard = async () : Promise<FlightStatisticDashboard> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/statistic/flightDashBoard`);

        const parsedResponse: DataApiResponse<FlightStatisticDashboard> = await response?.json();
        const data: FlightStatisticDashboard = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}

export const getFlightChartData = async () : Promise<FlightChartData[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/statistic/flightChartData`);

        const parsedResponse: DataApiResponse<FlightChartData[]> = await response?.json();
        const data: FlightChartData[] = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }   
}

export const getTicketChartData = async (timeType: ETimeType) : Promise<TicketChartData[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/statistic/ticketStatistic?timeType=${timeType}`)

        const parsedResponse: DataApiResponse<TicketChartData[]> = await response?.json();
        const data: TicketChartData[] = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }   
}

export const getFlightStatisticByAirport = async () : Promise<FlightStatisticByAirportData[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/statistic/flightStatisticByAirport`)
        const parsedResponse: DataApiResponse<FlightStatisticByAirportData[]> = await response?.json();
        const data: FlightStatisticByAirportData[] = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }  
}

export const getBookingStatisticDetail = async () : Promise<BookingStatisticDetails[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/booking?page=1&pageSize=5`, {
            method: 'GET',
        })

        const parsedResponse: DataApiResponse<BookingStatisticDetails[]> = await response?.json();
        const data: BookingStatisticDetails[] = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }  
}

export const getAllTickets = async () : Promise<number> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/getAllTickets`, {
            method: 'GET',
        })

        const parsedResponse: DataApiResponse<number> = await response?.json();
        const data: number = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }  
}

export const getAllFlights = async () : Promise<number> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/admins/getAllFlights`, {
            method: 'GET',
        })

        const parsedResponse: DataApiResponse<number> = await response?.json();
        const data: number = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }  
}