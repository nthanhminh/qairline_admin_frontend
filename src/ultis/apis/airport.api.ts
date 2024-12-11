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
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
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