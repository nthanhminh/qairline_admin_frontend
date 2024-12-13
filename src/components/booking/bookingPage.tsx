'use client';

import { FC, useEffect, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css"
import Image from "next/image";
import { Flight } from "@/ultis/type/flight.type";
import { getAllFligh } from "@/ultis/apis/booking.api";
import { convertSecondsToHHMM, handleTime } from "@/ultis/helpers/time.helper";
import { getFlighById } from "@/ultis/apis/flight.api";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
export interface BookingPageProps {
    translate: any
}
  
export const BookingPage: FC<BookingPageProps> = ({
    translate
}) => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [flightIdValue, setFlightIdValue] = useState<string>('');
    const pageSize = 4;
    const router = useRouter();
    const lng = useLocale();
    const fetchData = async () => {
        const {
            count,
            items
        } = await getAllFligh(page, pageSize);
        setFlights(items);
        setTotalPages(count);
    }

    const handleSearch = async (id: string) => {
        const flight = await getFlighById(id);
        setFlights([flight]);
    }

    useEffect(() => {
        fetchData();
    },[page])

    useEffect(() => {
        setPageNumber(Math.ceil(totalPages / pageSize));
    },[totalPages])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFlightIdValue(event.target.value); 
    };

    return (
        <div className={styles.bookingContainer}>
            <h2 className={styles.bookingHeader}>
                Bookings
            </h2>
            <div className={styles.bookingSearch}>
                <div className={styles.searchContainer}>
                    <label htmlFor="flightId" className={styles.labelInput}>Flight Id</label>
                    <input type="text" name="flightId" id="flightId" placeholder="Flight Id" className={styles.input} value={flightIdValue} onChange={handleChange}/>
                </div>
                <div className={styles.searchBtn} onClick={() => handleSearch(flightIdValue)}>
                    <Image src={"/images/flights/search_white.png"} alt="" width={24} height={24} unoptimized></Image>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.bookingListContainer}>
                    {
                        flights.map((flight,index) => {
                            const {startTime, endTime, date} = handleTime(flight?.departureTime!, flight?.duration!);
                            const durationTime = convertSecondsToHHMM(flight?.duration!);
                            let numberOfTickets = 0;
                            for (const booking of flight.bookings) {
                                numberOfTickets += (booking.tickets?.length ?? 0);
                            }
                            return (
                                <div className={styles.bookingItemContainer} key={index} onClick={
                                    () => {
                                        router.push(`bookings/${flight.id!}`);
                                    }
                                }>
                                    <div className={styles.bookingInfoContainer}>
                                        <div className={styles.bookingNameHeader}>Q Airline</div>
                                        <div className={styles.bookingInfo}>{flight?.plane?.name}</div>
                                        <div className={styles.numberInfo}>
                                            <div className={styles.dateInfo}>
                                                <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                                <div className={styles.bookingInfo}>{date}</div>
                                            </div>
                                            <div className={styles.passengerInfo}>
                                                <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                                <div className={styles.bookingInfo}>{numberOfTickets}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.flightInfoContainer}>
                                        <div className={styles.timeBookingContainer}>
                                            <div className={styles.bookingNameHeader}>
                                                {startTime}
                                            </div>
                                            <div className={styles.bookingInfo}>
                                                {flight?.fromAirport?.name}
                                            </div>
                                        </div>
                                        <div className={styles.airportContainer}>
                                            <div className={`${styles.bookingInfo} ${styles.textCenter}`}>
                                                Duration: {durationTime}
                                            </div>
                                            <div className={styles.bookingDecoration}>
                                                <div className={styles.circle}></div>
                                                <div className={styles.line}></div>
                                                <div className={styles.circle}></div>
                                            </div>
                                            <div className={styles.bookingAirportContainer}>
                                                <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                                    {flight?.fromAirport?.code}
                                                </div>
                                                <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                                    {flight?.toAirport?.code}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.timeBookingContainer}>
                                            <div className={styles.bookingNameHeader}>
                                                {endTime}
                                            </div>
                                            <div className={styles.bookingInfo}>
                                                {flight.toAirport?.code}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.dateContainer}>
                                        <div className={styles.bookingInfo}>
                                            Date
                                        </div>
                                        <div className={styles.bookingNameHeader}>
                                            {date}
                                        </div>
                                    </div>
                                    <div className={styles.status}>
                                        {flight.status}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className={styles.bookingItemContainer}>
                        <div className={styles.bookingInfoContainer}>
                            <div className={styles.bookingNameHeader}>Q Airline</div>
                            <div className={styles.bookingInfo}>Abus A310</div>
                            <div className={styles.numberInfo}>
                                <div className={styles.dateInfo}>
                                    <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>July 15, 2024</div>
                                </div>
                                <div className={styles.passengerInfo}>
                                    <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>200</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flightInfoContainer}>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    9:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    Paris
                                </div>
                            </div>
                            <div className={styles.airportContainer}>
                                <div className={`${styles.bookingInfo} ${styles.textCenter}`}>
                                    Duration: 8 hours
                                </div>
                                <div className={styles.bookingDecoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                </div>
                                <div className={styles.bookingAirportContainer}>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                        CDG
                                    </div>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                        JFK
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    12:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    New York
                                </div>
                            </div>
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.bookingInfo}>
                                Date
                            </div>
                            <div className={styles.bookingNameHeader}>
                                12-12-2024
                            </div>
                        </div>
                        <div className={styles.status}>
                            Confirmed
                        </div>
                    </div>
                    <div className={styles.bookingItemContainer}>
                        <div className={styles.bookingInfoContainer}>
                            <div className={styles.bookingNameHeader}>Q Airline</div>
                            <div className={styles.bookingInfo}>Abus A310</div>
                            <div className={styles.numberInfo}>
                                <div className={styles.dateInfo}>
                                    <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>July 15, 2024</div>
                                </div>
                                <div className={styles.passengerInfo}>
                                    <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>200</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flightInfoContainer}>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    9:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    Paris
                                </div>
                            </div>
                            <div className={styles.airportContainer}>
                                <div className={`${styles.bookingInfo} ${styles.textCenter}`}>
                                    Duration: 8 hours
                                </div>
                                <div className={styles.bookingDecoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                </div>
                                <div className={styles.bookingAirportContainer}>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                        CDG
                                    </div>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                        JFK
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    12:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    New York
                                </div>
                            </div>
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.bookingInfo}>
                                Date
                            </div>
                            <div className={styles.bookingNameHeader}>
                                12-12-2024
                            </div>
                        </div>
                        <div className={styles.status}>
                            Confirmed
                        </div>
                    </div>
                    <div className={styles.bookingItemContainer}>
                        <div className={styles.bookingInfoContainer}>
                            <div className={styles.bookingNameHeader}>Q Airline</div>
                            <div className={styles.bookingInfo}>Abus A310</div>
                            <div className={styles.numberInfo}>
                                <div className={styles.dateInfo}>
                                    <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>July 15, 2024</div>
                                </div>
                                <div className={styles.passengerInfo}>
                                    <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>200</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flightInfoContainer}>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    9:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    Paris
                                </div>
                            </div>
                            <div className={styles.airportContainer}>
                                <div className={`${styles.bookingInfo} ${styles.textCenter}`}>
                                    Duration: 8 hours
                                </div>
                                <div className={styles.bookingDecoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                </div>
                                <div className={styles.bookingAirportContainer}>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                        CDG
                                    </div>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                        JFK
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    12:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    New York
                                </div>
                            </div>
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.bookingInfo}>
                                Date
                            </div>
                            <div className={styles.bookingNameHeader}>
                                12-12-2024
                            </div>
                        </div>
                        <div className={styles.status}>
                            Confirmed
                        </div>
                    </div>
                    <div className={styles.bookingItemContainer}>
                        <div className={styles.bookingInfoContainer}>
                            <div className={styles.bookingNameHeader}>Q Airline</div>
                            <div className={styles.bookingInfo}>Abus A310</div>
                            <div className={styles.numberInfo}>
                                <div className={styles.dateInfo}>
                                    <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>July 15, 2024</div>
                                </div>
                                <div className={styles.passengerInfo}>
                                    <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                    <div className={styles.bookingInfo}>200</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flightInfoContainer}>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    9:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    Paris
                                </div>
                            </div>
                            <div className={styles.airportContainer}>
                                <div className={`${styles.bookingInfo} ${styles.textCenter}`}>
                                    Duration: 8 hours
                                </div>
                                <div className={styles.bookingDecoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                </div>
                                <div className={styles.bookingAirportContainer}>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                        CDG
                                    </div>
                                    <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                        JFK
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timeBookingContainer}>
                                <div className={styles.bookingNameHeader}>
                                    12:00
                                </div>
                                <div className={styles.bookingInfo}>
                                    New York
                                </div>
                            </div>
                        </div>
                        <div className={styles.dateContainer}>
                            <div className={styles.bookingInfo}>
                                Date
                            </div>
                            <div className={styles.bookingNameHeader}>
                                12-12-2024
                            </div>
                        </div>
                        <div className={styles.status}>
                            Confirmed
                        </div>
                    </div> */}
                </div>
                <div className={styles.pageContainer}>
                    {Array.from({ length: pageNumber }, (_, i) => (
                        <button key={i} className={`${styles.pageButton} ${(i+1) === page ? styles.selected : ''}`} onClick={() => setPage(i+1)}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
