import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { Service, ServiceDto } from "../type/service.type";

export const getAllServices = async () : Promise<DataGroupByType<Service>[]> => {
    try {
        const response = await fetch('https://qairline-backend-1.onrender.com/services');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Service>[]> = await response.json();
        const data: DataGroupByType<Service>[] = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
};

export const createService = async (serviceDto: ServiceDto) => {
    try {
        const response = await fetch('https://qairline-backend-1.onrender.com/services', { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(serviceDto),
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

export const editService = async (id: string, serviceDto: ServiceDto) => {
    try {
      const response = await fetch(`https://qairline-backend-1.onrender.com/services/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(serviceDto), 
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
};

export const deleteService = async (id: string) => {
    try {
        const response = await fetch(`https://qairline-backend-1.onrender.com/services/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
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
  