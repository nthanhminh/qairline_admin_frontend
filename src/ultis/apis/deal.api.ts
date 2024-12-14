import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { News, NewsDto } from "../type/deal.type";

export const getAllNews = async () : Promise<DataGroupByType<News>[]> => {
    try {
        const response = await fetch(`${baseUrl}/news/groupByType?page=1&pageSize=100`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<News>[]> = await response.json();
        const data: DataGroupByType<News>[] = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching News:', error);
        return [];
    }
};

export const createNews = async (newsDto: NewsDto) => {
    try {
        const response = await fetch(`${baseUrl}/news`,{ 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newsDto),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        const data = result.data;
        console.log("data", data);
        return result.data;
    } catch (error) {
        console.error('create new news failed:', error);
        throw error; 
    }
}

export const editNews = async (id: string, NewsDto: NewsDto) => {
    try {
      const response = await fetch(`${baseUrl}/news/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(NewsDto), 
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Edit news failed:', error);
      throw error;
    }
};

export const deleteNews = async (id: string) => {
    try {
        const response = await fetch(`${baseUrl}/news/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTg5Zjc5ZS01MzRmLTQ4OTYtYTM0Yi0yZWIwZWM0Zjg1ZTIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MTQ5ODcxLCJleHAiOjE3MzQ3NTQ2NzF9.40iRCXKPHoAp2kzF9RaLMVXRCSBaXO6ZleJzqm7taFk`,
              'Content-type': 'application/json'
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Edit delete news:', error);
        throw error;
    }
}
  