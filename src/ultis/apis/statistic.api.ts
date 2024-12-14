import { baseUrl } from "../constants"
import { DataApiResponse } from "../type/commom.type"
import { BookingStatisticDetails, ETimeType, FlightChartData, FlightStatisticByAirportData, FlightStatisticDashboard, TicketChartData } from "../type/statistic.type";

export const getFlightDataDashboard = async () : Promise<FlightStatisticDashboard> => {
    try {
        const response = await fetch(`${baseUrl}/admins/statistic/flightDashBoard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<FlightStatisticDashboard> = await response.json();
        const data: FlightStatisticDashboard = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getFlightChartData = async () : Promise<FlightChartData[]> => {
    try {
        const response = await fetch(`${baseUrl}/admins/statistic/flightChartData`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<FlightChartData[]> = await response.json();
        const data: FlightChartData[] = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }   
}

export const getTicketChartData = async (timeType: ETimeType) : Promise<TicketChartData[]> => {
    try {
        const response = await fetch(`${baseUrl}/admins/statistic/ticketStatistic?timeType=${timeType}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<TicketChartData[]> = await response.json();
        const data: TicketChartData[] = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }   
}

export const getFlightStatisticByAirport = async () : Promise<FlightStatisticByAirportData[]> => {
    try {
        const response = await fetch(`${baseUrl}/admins/statistic/flightStatisticByAirport`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<FlightStatisticByAirportData[]> = await response.json();
        const data: FlightStatisticByAirportData[] = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }  
}

export const getBookingStatisticDetail = async () : Promise<BookingStatisticDetails[]> => {
    try {
        const response = await fetch(`${baseUrl}/admins/booking?page=1&pageSize=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<BookingStatisticDetails[]> = await response.json();
        const data: BookingStatisticDetails[] = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }  
}

export const getAllTickets = async () : Promise<number> => {
    try {
        const response = await fetch(`${baseUrl}/admins/getAllTickets`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<number> = await response.json();
        const data: number = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }  
}

export const getAllFlights = async () : Promise<number> => {
    try {
        const response = await fetch(`${baseUrl}/admins/getAllFlights`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
                'Content-type': 'application/json'
            },
        })

        const parsedResponse: DataApiResponse<number> = await response.json();
        const data: number = parsedResponse.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }  
}