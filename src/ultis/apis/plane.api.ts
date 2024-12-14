import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType, FindAllApiResponse } from "../type/commom.type";
import { Plane, PlaneDto } from "../type/plane.type";

export const getAllPlane = async () : Promise<FindAllApiResponse<Plane>> => {
    try {
        const response = await fetch(`${baseUrl}/planes`,{ 
            method: 'GET',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
              'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Plane>> = await response.json();
        const data: FindAllApiResponse<Plane> = parseResponse.data;
        return data;
    } catch (error) {
        return {
            count: 0,
            items: []
        };
    }
};

export const createPlane = async (planeDto: PlaneDto) => {
    try {
        const response = await fetch(`${baseUrl}/planes`, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(planeDto),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        const data = result.data;
        return data;
    } catch (error) {
        throw error; 
    }
}

export const editPlane = async (id: string, planeDto: PlaneDto) => {
    try {
      const response = await fetch(`${baseUrl}/planes/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(planeDto), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
};

export const deletePlane = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/planes/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNzI0ODc5LCJleHAiOjE3MzQzMjk2Nzl9.uc5NJofSIyjou_lqufhwZ6mMdvY1Lc50juSPyfJPsjg`,
              'Content-type': 'application/json'
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log('Edit success:', result);
        return result;
    } catch (error) {
        console.error('Edit failed:', error);
        throw error;
    }
}
  