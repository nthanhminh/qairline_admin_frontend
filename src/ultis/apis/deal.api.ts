import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { News, NewsDto } from "../type/deal.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllNews = async () : Promise<DataGroupByType<News>[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/news/groupByType?page=1&pageSize=100`);
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<News>[]> = await response.json();
        const data: DataGroupByType<News>[] = parseResponse.data;
        return data;
    } catch (error) {
      throw new Error('Error');
    }
};

export const createNews = async (newsDto: NewsDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/news`,{ 
          method: 'POST',
          body: JSON.stringify(newsDto),
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

export const editNews = async (id: string, NewsDto: NewsDto) => {
    try {
      const response = await fetchInterceptor(`${baseUrl}/news/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(NewsDto), 
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

export const deleteNews = async (id: string) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/news/${id}`, {
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
  