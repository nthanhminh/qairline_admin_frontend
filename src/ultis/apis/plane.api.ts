import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType, FindAllApiResponse } from "../type/commom.type";
import { Plane, PlaneDto } from "../type/plane.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllPlane = async () : Promise<FindAllApiResponse<Plane>> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/planes`,{ 
            method: 'GET',
        });
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Plane>> = await response.json();
        const data: FindAllApiResponse<Plane> = parseResponse.data;
        return data;
    } catch (error) {
      throw new Error('Error');
    }
};

export const createPlane = async (planeDto: PlaneDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/planes`, { 
          method: 'POST',
          body: JSON.stringify(planeDto),
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result = await response.json();
        const data = result.data;
        return data;
    } catch (error) {
      throw new Error('Error');
    }
}

export const editPlane = async (id: string, planeDto: PlaneDto) => {
    try {
      const response = await fetchInterceptor(`${baseUrl}/planes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(planeDto), 
      });
  
      if (!response?.ok) {
        throw new Error(`Error: ${response?.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error('Error');
    }
};

export const deletePlane = async (id: string) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/planes/${id}`, {
          method: 'DELETE',
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result = await response.json();
        return result;
    } catch (error) {
      throw new Error('Error');
    }
}
  