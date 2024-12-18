import { baseUrl } from "../constants";
import { DataApiResponse, FindAllApiResponse } from "../type/commom.type";
import { Flight } from "../type/flight.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllFligh = async (page: number, pageSize: number) : Promise<FindAllApiResponse<Flight>>  =>{
    try {
        const response = await fetchInterceptor(`${baseUrl}/flights/getAllFlight?page=${page}&pageSize=${pageSize}`);
        const parsedResponse: DataApiResponse<FindAllApiResponse<Flight>> = await response?.json();
        const data: FindAllApiResponse<Flight> = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}