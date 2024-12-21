import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { Menu, MenuDto } from "../type/menu.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllMenu = async () : Promise<DataGroupByType<Menu>[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/menu?page=1&pageSize=100`);
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Menu>[]> = await response.json();
        const data: DataGroupByType<Menu>[] = parseResponse.data;
        return data;
    } catch (error) {
      throw new Error('Error');
    }
};

export const createMenu = async (menuDto: MenuDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/menu`, { 
          method: 'POST',
          body: JSON.stringify(menuDto),
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result = await response.json();
        const data = result.data;
        return result.data;
    } catch (error) {
      throw new Error('Error');
    }
}

export const editMenu = async (id: string, menuDto: MenuDto) => {
    try {
      const response = await fetchInterceptor(`${baseUrl}/menu/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(menuDto), 
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

export const deleteMenu = async (id: string) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/menu/${id}`, {
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
  