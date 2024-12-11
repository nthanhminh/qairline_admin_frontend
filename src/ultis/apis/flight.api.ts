import { EFlightStatus, SortBy } from "@/components/flight/enums";
import { baseUrl } from "../constants";
import { FindAllApiResponse, DataApiResponse } from "../type/commom.type";
import { Flight, FlightDto } from "../type/flight.type";

export const getAllFlight = async (
    search: string | null | undefined, 
    flightCode: string | null | undefined, 
    departureTime: string | null | undefined,
    sortedByPrice: SortBy | null | undefined,
    sortedByDeparture: SortBy | null | undefined,
    fromAiportId: string | null | undefined,
    toAiportId: string | null | undefined,
    status: EFlightStatus | null | undefined,
    page: number | null | undefined
) : Promise<FindAllApiResponse<Flight>> => {
    try {
        const queryParams = {
            search,
            flightCode,
            departureTime,
            sortedByPrice,
            sortedByDeparture,
            fromAiportId,
            toAiportId,
            status,
            page: page ? page: 1,
            pageSize: 4,
        };
        const queryString = buildQueryString(queryParams);
        console.log(queryString);
        const response = await fetch(`${baseUrl}/flights?${queryString}`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
              'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Flight>> = await response.json();
        const data: FindAllApiResponse<Flight> = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {
            count: 0,
            items: []
        };
    }
}

export const createMenu = async (flightDto: FlightDto) => {
    try {
        const response = await fetch('http://localhost:8000/flights', { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(flightDto),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        const data = result.data;
        console.log('Upload success:', result);
        console.log("data", data);
        return result.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

const buildQueryString = (params: Record<string, any>): string => {
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};