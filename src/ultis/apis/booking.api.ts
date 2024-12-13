import { baseUrl } from "../constants";
import { DataApiResponse, FindAllApiResponse } from "../type/commom.type";
import { Flight } from "../type/flight.type";

export const getAllFligh = async (page: number, pageSize: number) : Promise<FindAllApiResponse<Flight>>  =>{
    try {
        const response = await fetch(`${baseUrl}/flights/getAllFlight?page=${page}&pageSize=${pageSize}`);
        const parsedResponse: DataApiResponse<FindAllApiResponse<Flight>> = await response.json();
        const data: FindAllApiResponse<Flight> = parsedResponse.data;
        return data;
    } catch (error) {
        throw error
    }
}