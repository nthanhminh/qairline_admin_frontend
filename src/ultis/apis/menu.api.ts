import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { Menu, MenuDto } from "../type/menu.type";

export const getAllMenu = async () : Promise<DataGroupByType<Menu>[]> => {
    try {
        const response = await fetch(`${baseUrl}/menu?page=1&pageSize=100`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Menu>[]> = await response.json();
        const data: DataGroupByType<Menu>[] = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
};

export const createMenu = async (menuDto: MenuDto) => {
    try {
        const response = await fetch(`${baseUrl}/menu`, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(menuDto),
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

export const editMenu = async (id: string, menuDto: MenuDto) => {
    try {
      const response = await fetch(`${baseUrl}/menu/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(menuDto), 
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

export const deleteMenu = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/menu/${id}`, {
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
  