import { baseUrl } from "../constants";
import { DataApiResponse, DataGroupByType } from "../type/commom.type";
import { Service, ServiceDto } from "../type/service.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllServices = async (): Promise<DataGroupByType<Service>[]> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/services`);
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<DataGroupByType<Service>[]> =
            await response.json();
        const data: DataGroupByType<Service>[] = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error("Error");
    }
};

export const createService = async (serviceDto: ServiceDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/services`, {
            method: "POST",
            body: JSON.stringify(serviceDto),
        });

        if (!response?.ok) {
            throw new Error(`Error: ${response?.statusText}`);
        }

        const result = await response.json();
        const data = result.data;
        console.log("Upload success:", result);
        console.log("data", data);
        return result.data;
    } catch (error) {
        throw new Error("Error");
    }
};

export const editService = async (id: string, serviceDto: ServiceDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/services/${id}`, {
            method: "PATCH",
            body: JSON.stringify(serviceDto),
        });

        if (!response?.ok) {
            throw new Error(`Error: ${response?.statusText}`);
        }
        const result = await response?.json();
        console.log("Edit success:", result);
        return result;
    } catch (error) {
        throw new Error("Error");
    }
};

export const deleteService = async (id: string) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/services/${id}`, {
            method: "DELETE",
        });

        if (!response?.ok) {
            throw new Error(`Error: ${response?.statusText}`);
        }

        const result = await response?.json();
        console.log("Edit success:", result);
        return result;
    } catch (error) {
        throw new Error("Error");
    }
};
