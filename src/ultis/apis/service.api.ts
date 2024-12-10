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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNjcyNTU5LCJleHAiOjE3MzQyNzczNTl9.35L_6VPYwBk84ww5cM_zj4EBH4jxOv-0TsNkrkhLJuA`,
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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNjcyNTU5LCJleHAiOjE3MzQyNzczNTl9.35L_6VPYwBk84ww5cM_zj4EBH4jxOv-0TsNkrkhLJuA`,
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
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzMzNjcyNTU5LCJleHAiOjE3MzQyNzczNTl9.35L_6VPYwBk84ww5cM_zj4EBH4jxOv-0TsNkrkhLJuA`,
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
  