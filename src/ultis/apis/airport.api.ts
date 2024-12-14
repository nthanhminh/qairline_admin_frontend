import { baseUrl } from "../constants";
import { Airport } from "../type/airport.type";
import { DataApiResponse, DataGroupByType, FindAllApiResponse } from "../type/commom.type";

export const getAllAirport = async () : Promise<DataGroupByType<Airport>[]> => {
    try {
        const response = await fetch(`${baseUrl}/airports/groupByRegions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Airport>[]> = await response.json();
        const data: DataGroupByType<Airport>[] = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching airport:', error);
        return [];
    }
};

export const getRecommnededAirport = async (search: string) : Promise<FindAllApiResponse<Airport>> => {
    try {
        const response = await fetch(`${baseUrl}/airports?search=${search}&page=1&pageSize=100`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
              'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Airport>> = await response.json();
        const data: FindAllApiResponse<Airport> = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {
            count: 0,
            items: []
        };
    }
}