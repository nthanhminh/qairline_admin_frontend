import { baseUrl } from "../constants";
import { Airport } from "../type/airport.type";
import { DataApiResponse, DataGroupByType, FindAllApiResponse } from "../type/commom.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllAirport = async () : Promise<DataGroupByType<Airport>[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/airports/groupByRegions`);
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Airport>[]> = await response.json();
        const data: DataGroupByType<Airport>[] = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error fetching');
    }
};

export const getRecommnededAirport = async (search: string) : Promise<FindAllApiResponse<Airport>> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/airports?search=${search}&page=1&pageSize=100`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
              'Content-type': 'application/json'
            },
        });
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Airport>> = await response.json();
        const data: FindAllApiResponse<Airport> = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error fetching');
    }
}