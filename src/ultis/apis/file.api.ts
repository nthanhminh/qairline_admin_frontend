import { baseUrl } from "../constants";

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file); 

    try {
      const response = await fetch(`${baseUrl}/files`, { // Add protocol here
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return `${baseUrl}/${result.data[0]}`; 
    } catch (error) {
      throw error;
    }
  };
  