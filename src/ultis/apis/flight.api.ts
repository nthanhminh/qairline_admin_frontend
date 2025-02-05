import { EFlightStatus, SortBy } from "@/components/flight/enums";
import { baseUrl } from "../constants";
import { FindAllApiResponse, DataApiResponse } from "../type/commom.type";
import { CreateFLightDto, ESeatClass, Flight, FlightDto, FlightPrice, PriceData, PriceDataId, UpdatePriceDto } from "../type/flight.type";
import { fetchInterceptor } from "./fetch.interceptor";

export const getAllFlight = async (
    search: string | null | undefined, 
    // flightCode: string | null | undefined, 
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
            // flightCode,
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
        const response = await fetchInterceptor(`${baseUrl}/flights?${queryString}`, { 
            method: 'GET',
        });
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const parseResponse: DataApiResponse<FindAllApiResponse<Flight>> = await response.json();
        const data: FindAllApiResponse<Flight> = parseResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}

export const getFlighById = async (id: string) : Promise<Flight> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/flights/getFlightById?id=${id}`);
        const parsedResponse: DataApiResponse<Flight> = await response?.json();
        const data: Flight = parsedResponse.data;
        return data;
    } catch (error) {
        throw new Error('Error');
    }
}

export const getNumberOfTicketFromFlightId = async (flightId: string) : Promise<number> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/tickets/flight?flightId=${flightId}`);
        const parsedResponse: DataApiResponse<string[]> = await response?.json();
        const data: string[] = parsedResponse.data;
        return data.length;
    } catch (error) {
        throw new Error('Error');
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
        throw new Error('Error');
    }
}

export const createNewFlight = async(createFLightDto: CreateFLightDto) : Promise<Flight> => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/flights`, { 
          method: 'POST',
          body: JSON.stringify(createFLightDto),
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result:DataApiResponse<Flight> = await response.json();
        const flight:Flight = result.data;
        return flight;
    } catch (error) {
        throw new Error('Error');
    }
}

export const updateFlight = async (id: string, createFlightDto: CreateFLightDto) => {
    try {
        const response = await fetchInterceptor(`${baseUrl}/flights/${id}`, { 
            method: 'PATCH',
            body: JSON.stringify(createFlightDto),
          });
      
          if (!response?.ok) {
            throw new Error(`Error: ${response?.statusText}`);
          }
      
          const result = await response.json();
          return result.data;
    } catch (error) {
        throw new Error('Error');
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
        throw new Error('Error');
    }
}

export const createPriceForFlight = async(updatePriceDto: UpdatePriceDto, flightId: string) : Promise<boolean> => {
    try {
        const pricesData = getPriceDataFromUpdatePriceDto(updatePriceDto);
        const response = await fetchInterceptor(`${baseUrl}/flight_price/createAllPrice/`, { 
          method: 'POST',
          body: JSON.stringify({
            flightId: flightId,
            pricesData: pricesData
          }),
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result:DataApiResponse<boolean> = await response.json();
        const check:boolean = result.data;

        return check;
    } catch (error) {
        throw new Error('Error');
    }
}

export const updatePriceForFlight = async(updatePriceDto: UpdatePriceDto, flightId: string, flightPrice: FlightPrice[]) : Promise<boolean> => {
    try {
        const pricesData = getPriceDataFromUpdatePriceDtoForUpdate(updatePriceDto, flightPrice);
        const response = await fetchInterceptor(`${baseUrl}/flight_price/updateAllPrice/`, { 
          method: 'PATCH',
          body: JSON.stringify({
            flightId: flightId,
            pricesData: pricesData
          }),
        });
    
        if (!response?.ok) {
          throw new Error(`Error: ${response?.statusText}`);
        }
    
        const result:DataApiResponse<boolean> = await response.json();
        const check:boolean = result.data;

        return check;
    } catch (error) {
        throw new Error('Error');
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