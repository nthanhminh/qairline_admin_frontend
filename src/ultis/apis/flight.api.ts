import { EFlightStatus, SortBy } from "@/components/flight/enums";
import { baseUrl } from "../constants";
import { FindAllApiResponse, DataApiResponse } from "../type/commom.type";
import { CreateFLightDto, ESeatClass, Flight, FlightDto, FlightPrice, PriceData, PriceDataId, UpdatePriceDto } from "../type/flight.type";

export const getAllFlight = async (
    search: string | null | undefined, 
    flightCode: string | null | undefined, 
    departureTime: string | null | undefined,
    sortedByPrice: SortBy | null | undefined,
    sortedByDeparture: SortBy | null | undefined,
    fromAiportId: string | null | undefined,
    toAiportId: string | null | undefined,
    status: EFlightStatus | null | undefined,
    page: number | null | undefined
) : Promise<FindAllApiResponse<Flight>> => {
    try {
        const queryParams = {
            search,
            flightCode,
            departureTime,
            sortedByPrice,
            sortedByDeparture,
            fromAiportId,
            toAiportId,
            status,
            page: page ? page: 1,
            pageSize: 4,
        };
        const queryString = buildQueryString(queryParams);
        console.log(queryString);
        const response = await fetch(`${baseUrl}/flights?${queryString}`, { 
            method: 'GET',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
              'Content-type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Flight>> = await response.json();
        const data: FindAllApiResponse<Flight> = parseResponse.data;
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {
            count: 0,
            items: []
        };
    }
}

export const getFlighById = async (id: string) : Promise<Flight> => {
    try {
        const response = await fetch(`${baseUrl}/flights/getFlightById?id=${id}`);
        const parsedResponse: DataApiResponse<Flight> = await response.json();
        const data: Flight = parsedResponse.data;
        return data;
    } catch (error) {
        throw error
    }
}

export const getNumberOfTicketFromFlightId = async (flightId: string) : Promise<number> => {
    try {
        const response = await fetch(`${baseUrl}/tickets/getNumberOfTicketsForFlight?flightId=${flightId}`);
        const parsedResponse: DataApiResponse<number> = await response.json();
        const data: number = parsedResponse.data;
        return data;
    } catch (error) {
        throw error
    }
}

export const createFlight = async (flightDto: FlightDto) : Promise<boolean> => {
    try {
        const {basic_economy_price, economy_price, premium_economy_price, business_price, ...data} = flightDto;
        const flight:Flight = await createNewFlight(data);
        const updateFlight = await createPriceForFlight({
            basic_economy_price,
            economy_price,
            premium_economy_price,
            business_price,
        }, flight.id!);
        return updateFlight;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

export const createNewFlight = async(createFLightDto: CreateFLightDto) : Promise<Flight> => {
    try {
        const response = await fetch(`${baseUrl}/flights`, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify(createFLightDto),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result:DataApiResponse<Flight> = await response.json();
        const flight:Flight = result.data;
        return flight;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

export const updateFlight = async (id: string, createFlightDto: CreateFLightDto) => {
    try {
        const response = await fetch(`${baseUrl}/flights/${id}`, { 
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
              'Content-type': 'application/json'
            },
            body: JSON.stringify(createFlightDto),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          const result = await response.json();
          return result.data;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

export const UpdateFlightAndPrice = async(flightId: string, flightDto: FlightDto, flightPrice: FlightPrice[]) => {
    try {
        const {business_price, economy_price, premium_economy_price, basic_economy_price, ...data} = flightDto;
        const [updatedFlight, updatedPrice] = await Promise.all([
            updateFlight(flightId, data),
            updatePriceForFlight({
                basic_economy_price,
                economy_price,
                premium_economy_price,
                business_price,
            }, flightId, flightPrice)
        ]);
        return updatedPrice;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

export const createPriceForFlight = async(updatePriceDto: UpdatePriceDto, flightId: string) : Promise<boolean> => {
    try {
        const pricesData = getPriceDataFromUpdatePriceDto(updatePriceDto);
        const response = await fetch(`${baseUrl}/flight_price/createAllPrice/`, { 
          method: 'POST',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            flightId: flightId,
            pricesData: pricesData
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result:DataApiResponse<boolean> = await response.json();
        const check:boolean = result.data;

        return check;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

export const updatePriceForFlight = async(updatePriceDto: UpdatePriceDto, flightId: string, flightPrice: FlightPrice[]) : Promise<boolean> => {
    try {
        const pricesData = getPriceDataFromUpdatePriceDtoForUpdate(updatePriceDto, flightPrice);
        const response = await fetch(`${baseUrl}/flight_price/updateAllPrice/`, { 
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTQ2ZDg4MC05YmE5LTQyMDMtYmI3NC04OGUxZjIyMmQwNjIiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MzY1NTc5LCJleHAiOjE3MzQ5NzAzNzl9.Cfs-VPoduoO3SsVLqxjI8sF8DDHOIaN8hfBRJvtstsE`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            flightId: flightId,
            pricesData: pricesData
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result:DataApiResponse<boolean> = await response.json();
        const check:boolean = result.data;

        return check;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error; 
    }
}

const getPriceDataFromUpdatePriceDto = (updatePriceDto: UpdatePriceDto) : PriceData[] => {
    return [
        {
            price: updatePriceDto.business_price,
            seatClass: ESeatClass.BUSINESS
        },
        {
            price: updatePriceDto.premium_economy_price,
            seatClass: ESeatClass.PREMIUM_ECONOMY
        },
        {
            price: updatePriceDto.basic_economy_price,
            seatClass: ESeatClass.BASIC_ECONOMY
        }, 
        {
            price: updatePriceDto.economy_price,
            seatClass: ESeatClass.ECONOMY
        }
    ];
}

const getPriceDataFromUpdatePriceDtoForUpdate = (updatePriceDto: UpdatePriceDto, flightPrice: FlightPrice[]): PriceDataId[] => {
    return [
        {
            price: updatePriceDto.business_price,
            seatClass: ESeatClass.BUSINESS,
            id: flightPrice.find(p => p.seatClassInfo!.name === ESeatClass.BUSINESS)?.id!
        },
        {
            price: updatePriceDto.premium_economy_price,
            seatClass: ESeatClass.PREMIUM_ECONOMY,
            id: flightPrice.find(p => p.seatClassInfo?.name === ESeatClass.PREMIUM_ECONOMY)?.id!
        },
        {
            price: updatePriceDto.basic_economy_price,
            seatClass: ESeatClass.BASIC_ECONOMY,
            id: flightPrice.find(p => p.seatClassInfo?.name === ESeatClass.BASIC_ECONOMY)?.id!
        }, 
        {
            price: updatePriceDto.economy_price,
            seatClass: ESeatClass.ECONOMY,
            id: flightPrice.find(p => p.seatClassInfo?.name === ESeatClass.ECONOMY)?.id!
        }
    ];
}


const buildQueryString = (params: Record<string, any>): string => {
    return Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};