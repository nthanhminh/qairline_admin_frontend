'use client';

import { ChangeEvent, FC, useEffect, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css"
import Image from "next/image";
import CustomDatePicker from "../datePicker/datePicker";
import { Airport } from "@/ultis/type/airport.type";
import { DataGroupByType, FindAllApiResponse } from "@/ultis/type/commom.type";
import { getAllAirport, getRecommnededAirport } from "@/ultis/apis/airport.api";
import { debounce } from 'lodash';
import moment from 'moment';
import { EFlightStatus, FlightStatusRender, SortBy, SortByRender } from "./enums";
import { getAllFlight } from "@/ultis/apis/flight.api";
import { Flight } from "@/ultis/type/flight.type";
import FlightForm from "../edit/flight/editFlight.page";
import { useRouter } from "next/navigation";
import { convertSecondsToHHMM, handleTime } from "@/ultis/helpers/time.helper";
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";

export interface FlightPageProps {
    translate: any
}
  
export const FlightPage: FC<FlightPageProps> = ({
    translate
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [fromAirportValue, setFromAirportValue] = useState<string|undefined>(undefined);
    const [toAirportValue, setToAirportValue] = useState<string|undefined>(undefined);
    const [isFromActive, setIsFromActive] = useState<boolean>(false);
    const [isToActive, setIsToActive] = useState<boolean>(false);
    const [aiportsGroupByRegions, setAiportsGroupByRegions] = useState<DataGroupByType<Airport>[]>([]);
    const [fromAiportRecommended, setFromAiportRecommended] = useState<Airport[]>([]);
    const [fromAirportId, setFromAiportId] = useState<string | undefined>(undefined);
    const [toAirportId, setToAiportId] = useState<string | undefined>(undefined);
    const [toAiportRecommended, setToAiportRecommended] = useState<Airport[]>([]);
    const [priceSortBy, setPriceSortBy] = useState<SortBy | undefined>(undefined);
    const [departureSortBy, setDepartureSortBy] = useState<SortBy | undefined>(undefined);
    const [flightCode, setFlightCode] = useState<string>('');
    const [status, setStatus] = useState<EFlightStatus | undefined>(undefined);
    const [page, setPage] = useState<number>(1);
    const [flightList, setFlightList] = useState<Flight[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [flightChange, setFlightChange] = useState<Flight | null>(null);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {handleShowMessage} = useGlobalContext();

    useEffect(() => {
        setPageNumber(Math.ceil(totalPages/4))
    },[totalPages]);


    useEffect(() => {
        handleSearch();
    },[page]);

    useEffect(() => {
        handleSearch();
    },[]);

    const exchangeAiports = (fromAirportValue: string, toAirportValue: string, fromAirportId:string, toAirportId: string) => {
        setToAiportId(fromAirportId);
        setToAirportValue(fromAirportValue); 
        setFromAiportId(toAirportId);
        setFromAirportValue(toAirportValue);
    }

    const handleCreateNewFlight = async () => {
        setFlightChange(null);
        setIsShowPopup(true);
    }

    const closePopup = () => {
        setIsShowPopup(false);
    }

    const handleSearch = async () => {
        try {
            if((!fromAirportId && fromAirportValue) || (!toAirportId && toAirportValue)) {
                setFromAirportValue('');
                setToAirportValue('');
                setFromAiportId(undefined);
                setToAiportId(undefined);
                setIsFromActive(false);
                setIsToActive(false);
                handleShowMessage(2, 'Please select correct airports');
                return;
            }
            setIsLoading(true);
            const {items, count} = await getAllFlight(
                flightCode,
                selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : null,
                priceSortBy,
                departureSortBy,
                fromAirportId,
                toAirportId,
                status,
                page
            );
            setFlightList(items);
            setTotalPages(count);
            setIsLoading(false)
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const resetFiltersToDefault = () => {
        setFlightCode('');
        setSelectedDate(null);
        setPriceSortBy(undefined);
        setDepartureSortBy(undefined);
        setFromAiportId(undefined);
        setToAiportId(undefined);
        setStatus(undefined);
        setPage(1);
      };

    const handleChangeFlightCode = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setFlightCode(value);
    };

    const fetchData = async () => {
        try {
            const data = await getAllAirport();
            setAiportsGroupByRegions(data); 
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        resetFiltersToDefault();
        handleSearch()
    }, [isDummy])

    const fetchRecommendedAirport = async(search: string) : Promise<FindAllApiResponse<Airport>> => {
        const airports = getRecommnededAirport(search);
        return airports;
    }

    const getFromRecommendedAirport = async(search: string) : Promise<void> => {
        try {
            const airports = (await fetchRecommendedAirport(search)).items;
            setFromAiportRecommended(airports);
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const getToRecommendedAirport = async(search: string) : Promise<void> => {
        try {
            const airports = (await fetchRecommendedAirport(search)).items;
            setToAiportRecommended(airports);   
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const handleChangeFromAirport = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setFromAirportValue(value);
        debounce(async () => {
            await getFromRecommendedAirport(value);
        }, 300)();
        setFromAiportId(undefined);
    };

    const handleChangeToAirport = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setToAirportValue(value);
        debounce(async () => {
            await getToRecommendedAirport(value);
        }, 300)();
        setToAiportId(undefined);
    };

    const handleChooseFromAirport = (id: string | undefined, value: string) => {
        setIsFromActive(true);
        setFromAiportId(id);
        setFromAirportValue(value);
    }

    const handleChooseToAirport = (id: string | undefined, value: string) => {
        setIsToActive(true);
        setToAiportId(id);
        setToAirportValue(value);
    }

    // const pageSize:number = 4;
    return (
        <div className={styles.flightContainer}>
            <h2 className={styles.flightHeader}>
                Flights
            </h2>
            <div className={styles.flightSearchContainer}>
                <div className={styles.airportSearch}>
                    <label htmlFor="fromAirport">From</label>
                    <input type="text" name="fromAirport" id="fromAirport" className={styles.input} onClick={() => {
                        setIsFromActive(true);
                        }} onChange={handleChangeFromAirport} value={fromAirportValue} required/>
                    {
                        fromAirportValue !== '' ? 
                        (
                            <div className={styles.airportListRecommended}>
                                {
                                    fromAiportRecommended.map((airport, index) => {
                                        return (
                                            <div className={styles.airportItemRecommended} key={airport.id ?? index} onClick={() => handleChooseFromAirport(airport.id, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                                {airport.name!}, {airport.location!} ({airport.code})
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                        : <></>
                    }
                    {
                        (isFromActive && (fromAirportValue === '' || !fromAirportValue)) && (
                            <div className={styles.airportContainer}>
                                {
                                    aiportsGroupByRegions.map(({type, items}, index) => {
                                        return (
                                            <div className={styles.regionContainer} key={index}>
                                                {type}
                                                <div className={styles.airportList}>
                                                    {
                                                        items.map((airport, index) => {
                                                            return (
                                                                <div className={styles.airportItem} key={airport.id ?? index} onClick={() => handleChooseFromAirport(airport.id, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                                                    {airport.name!}, {airport.location!} ({airport.code})
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div> 
                <div className={styles.exchangeBtn} onClick={() => {
                    exchangeAiports(fromAirportValue!, toAirportValue!, fromAirportId!, toAirportId!);
                }}>
                    <Image src="/images/flights/transfer.png" alt="" width={20} height={20} unoptimized></Image>
                </div>
                <div className={styles.airportSearch}>
                    <label htmlFor="toAirport">To</label>
                    <input type="text" name="toAirport" id="toAirport" className={styles.input} onClick={() => {setIsToActive(true)}} onChange={handleChangeToAirport} value={toAirportValue} required/>
                    {
                        (toAirportValue !== '') ? 
                        <div className={styles.airportListRecommended}>
                            {
                                toAiportRecommended.map((airport, index) => {
                                    return (
                                        <div className={styles.airportItemRecommended} key={airport.id ?? index} onClick={() => handleChooseToAirport(airport.id, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                            {airport.name!}, {airport.location!} ({airport.code})
                                        </div>
                                    )
                                })
                            }
                        </div> : <></>
                    }
                    {
                        (isToActive && (toAirportValue === '' || !toAirportValue)) && 
                        (
                            <div className={styles.airportContainer}>
                                {
                                    aiportsGroupByRegions.map(({type, items}, index) => {
                                        return (
                                            <div className={styles.regionContainer} key={index}>
                                                {type}
                                                <div className={styles.airportList}>
                                                    {
                                                        items.map((airport, index) => {
                                                            return (
                                                                <div className={styles.airportItem} key={airport.id ?? index} onClick={() => handleChooseToAirport(airport.id, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                                                    {airport.name!}, {airport.location!} ({airport.code})
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div> 
                <div className={styles.airportSearch}>
                    <label htmlFor="Flight Code">Flight Code</label>
                    <input type="text" name="Flight Code" id="Flight Code" className={styles.input} onChange={handleChangeFlightCode} value={flightCode}/>
                </div> 
                <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}></CustomDatePicker>
                <div className={styles.SearchBtn} onClick={() => {
                    handleSearch();
                }}>
                    <Image src="/images/flights/search.png" width={24} height={24} unoptimized alt=""></Image>
                </div>
            </div>
            <div className={styles.fligthList}>
                <h5 className={styles.fligthListName}>
                    Flight List
                </h5>
                <div className={styles.functionalBtnContainer}>
                    <div className={styles.functionalDes}>
                        Sort by
                    </div>
                    <div className={styles.sortBy}>
                        {priceSortBy ? SortByRender[priceSortBy] : ''}
                        <Image src="/images/dashboard/arrow.png" alt="" width={12} height={12}></Image>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionItem} onClick={() => setPriceSortBy(SortBy.ASC_PRICE)}>
                                Cheapest
                            </div>
                            <div className={styles.optionItem} onClick={() => setPriceSortBy(SortBy.DESC_PRICE)}>
                                Most expensive
                            </div>
                        </div>
                    </div>
                    <div className={styles.sortBy}>
                        {departureSortBy ? SortByRender[departureSortBy] : ''}
                        <Image src="/images/dashboard/arrow.png" alt="" width={12} height={12}></Image>
                        <div className={`${styles.optionContainer} ${styles.sortByDeparture}`}>
                            <div 
                                className={styles.optionItem} 
                                style={{
                                    padding: "8px 30px"
                                }}
                                onClick={() => setDepartureSortBy(SortBy.ASC_DEPARTURE_TIME)}
                            >
                                Earliest
                            </div>
                            <div 
                                className={`${styles.optionItem}`} 
                                style={{
                                    padding: "8px 30px"
                                }}
                                onClick={() => setDepartureSortBy(SortBy.DESC_DEPARTURE_TIME)}
                            >
                                Latest
                            </div>
                        </div>
                    </div> 
                    <div className={styles.functionalDes}>
                        Filter by
                    </div>
                    <div className={styles.sortBy}>
                        { status ? FlightStatusRender[status] : ''}
                        <Image src="/images/dashboard/arrow.png" alt="" width={12} height={12}></Image>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionItem} onClick={() => setStatus(EFlightStatus.ACTIVE)}>
                                Active
                            </div>
                            <div className={styles.optionItem} onClick={() => setStatus(EFlightStatus.DONE)}>
                                Done
                            </div>
                            <div className={styles.optionItem} onClick={() => setStatus(EFlightStatus.DELAYED)}>
                                Delayed
                            </div>
                            <div className={styles.optionItem} onClick={() => setStatus(EFlightStatus.CANCELLED)}>
                                Cancelled
                            </div>
                        </div>
                    </div>
                    <div className={styles.addFlight} onClick={handleCreateNewFlight}>
                        Add Flight
                    </div>  
                </div>
            </div>
            <div className={styles.contentContainer}>
                {isLoading ? <LottieAnimation></LottieAnimation> : (
                     <div className={styles.flightListContainer}>
                     {
                         flightList.length === 0 ? (
                             <div className={styles.noData}>
                                 No Data
                             </div>
                         ) :
                         flightList.map((flight, index) => {
                             const {startTime, endTime} = handleTime(flight.departureTime!, flight.duration!);
                             return (
                                 <div className={styles.flightItemContainer} key={flight.id ?? index} onClick={
                                     () => {
                                         router.push(`flights/${flight.id!}`);
                                     }
                                 }>
                                     <div className={styles.flightItemInfo}>
                                         <Image  className={styles.paperIcon} src='/images/flights/paper-plane.png' width={28} height={28} alt="" unoptimized></Image>
                                         <div className={styles.airlineInfo}>
                                             <h5 className={styles.airlineName}>
                                                 Q Airline
                                             </h5>
                                             <p className={styles.flightInfo}>
                                                 {flight.flightCode}
                                             </p>
                                         </div>
                                         <div className={`${styles.airportInfo} ${styles.from}`}>
                                             <p className={styles.airlineName}>{startTime}</p>
                                             <p className={styles.flightInfo}>{flight.fromAirport?.name}</p>
                                         </div>
                                         <div className={styles.durationContainer}>
                                             <div className={styles.flightInfoContainer}>
                                                 <div className={styles.flightInfo}>
                                                     {flight.fromAirport?.code}
                                                 </div>
                                                 <div className={styles.decoration}>
                                                     <div className={styles.circle}></div>
                                                     <div className={styles.line}></div>
                                                     <div className={styles.circle}></div>
                                                     <Image src="/images/icons/departure.png" alt="" width={12} height={12} unoptimized></Image>
                                                 </div>
                                                 <div className={styles.flightInfo}>
                                                     {flight.toAirport?.code}
                                                 </div>
                                             </div>
                                             <div className={styles.durationDetail}>
                                                 Duration: {convertSecondsToHHMM(flight.duration!)}
                                             </div> 
                                         </div>
                                         <div className={`${styles.airportInfo} ${styles.to}`}>
                                             <p className={styles.airlineName}>{endTime}</p>
                                             <p className={styles.flightInfo}>{flight.toAirport?.name}</p>
                                         </div>
                                     </div>
                                     <div className={styles.priceAndClassInfo}>
                                         <div className={styles.priceFacility}>
                                             <p>Facility</p>
                                             <div className={styles.advantage}>
                                                 <Image src='/images/flights/travel.png' alt="" width={16} height={16}></Image>
                                                 <div className={styles.classInfo}>
                                                     1 baggage
                                                 </div>
                                             </div>
                                             <div className={styles.advantage}>
                                                 <Image src='/images/flights/dinner.png' alt="" width={16} height={16}></Image>
                                                 <div className={styles.classInfo}>
                                                     In - flight meal
                                                 </div>
                                             </div>
                                         </div>
                                         <div className={styles.priceInfo}>
                                             <div className={styles.price}>
                                                 ${flight.flightsPrice?.find(item => item.seatClassInfo?.name === "BASIC_ECONOMY")?.price ?? 100} <span className={styles.unit}>/ pax</span>
                                             </div>
                                             <div className={styles.viewDetail}>
                                                 View Detail
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             )
                         })
                     }
                 </div>
                )}
            <div className={styles.pageContainer}>
                {Array.from({ length: pageNumber }, (_, i) => (
                    <button key={i} className={`${styles.pageButton} ${(i+1) === page ? styles.selected : ''}`} onClick={() => setPage(i+1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
            </div>
            {isShowPopup && <FlightForm callback={closePopup} flight={flightChange} setIsDummy={setIsDummy} isDummy={isDummy} groupBySeatClassData={null}></FlightForm>}
        </div>
    );
}