'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import FlightForm from "../edit/flight/editFlight.page";
import { ESeatClass, Flight, FlightPrice } from "@/ultis/type/flight.type";
import { getFlighById, getNumberOfTicketFromFlightId } from "@/ultis/apis/flight.api";
import { useRouter } from "next/navigation";
import { convertSecondsToHHMM, handleTime } from "@/ultis/helpers/time.helper";
export interface FlightDetailPageProps {
    id: string
    translate: any
}
  
export const FlightDetailPage: FC<FlightDetailPageProps> = ({
    id,
    translate
}) => {
    const [flight, setFlight] = useState<Flight | null>(null);
    const [passengers, setPassengers] = useState<number>(0);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const [groupFlightsBySeatClassData, setGroupFlightsBySeatClassData] = useState<Record<string, FlightPrice[]>>();
    const [seatClassDetail, setSeatClassDetail] = useState<ESeatClass>(ESeatClass.ECONOMY)
    const router = useRouter();

    const groupFlightsBySeatClassName = (flights: FlightPrice[]) => {
        return flights.reduce((acc, flight) => {
          const { name } = flight.seatClassInfo!;
          if (!acc[name!]) {
            acc[name!] = [];
          }
          acc[name!].push(flight);
          return acc;
        }, {} as Record<string, FlightPrice[]>);
    };

    const fetchData = async () => {
        const [flightData, ticketsData] = await Promise.all([
            getFlighById(id),
            getNumberOfTicketFromFlightId(id),
        ])
        console.log(flightData.flightsPrice);
        const data = groupFlightsBySeatClassName(flightData.flightsPrice!);
        console.log("test",data);
        console.log(data["BUSINESS"]?.[0]?.price);
        setFlight(flightData);
        setPassengers(ticketsData);
        setGroupFlightsBySeatClassData(data);
        // console.log(groupFlightsBySeatClassName(flight?.flightsPrice!));
    }

    useEffect(() => {
        console.log(groupFlightsBySeatClassData);
    }, [groupFlightsBySeatClassData])

    const handleEditFlight = async () => {
        setIsShowPopup(true);
    }
    const closePopup = () => {
        setIsShowPopup(false);
    }
    useEffect(() => {
        fetchData();
    }, [isDummy]);

    const {startTime, endTime, date} = handleTime(flight?.departureTime!, flight?.duration!);
    const durationFormatted = convertSecondsToHHMM(flight?.duration!);
    return (
        <div className={styles.flightDetailContainer}>
            <div className={styles.headerFlightDetailContainer}>
                <div className={styles.descriptionContainer}>
                    <div className={styles.backBtn} onClick= {
                        () => {
                            router.back();
                        }
                    }>
                        <Image src="/images/flights/back.png" alt="" width={18} height={18}></Image>
                    </div>
                    <div className={styles.flightInfoContainer}>
                        <div className={styles.flightInfo} style={
                                {
                                    color: "#1D7D8F",
                                    fontWeight: "bold",
                                }
                        }>
                            {flight?.flightCode}
                        </div>
                        <div className={styles.aiport}>
                            {flight?.fromAirport?.name} - {flight?.toAirport?.name}
                        </div>
                        <div className={styles.flightInfo}>
                            {flight?.plane?.name} - {passengers} Passengers
                        </div>
                    </div>
                </div>
                <div className={styles.leftContainer}>
                    <div className={styles.sortBy}>
                        {seatClassDetail}
                        <Image src="/images/dashboard/arrow.png" alt="" width={12} height={12}></Image>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionItem} onClick={() => setSeatClassDetail(ESeatClass.ECONOMY)}>
                                ECONOMY
                            </div>
                            <div className={styles.optionItem} onClick={() => setSeatClassDetail(ESeatClass.BUSINESS)}>
                                BUSINESS
                            </div>
                            <div className={styles.optionItem} onClick={() => setSeatClassDetail(ESeatClass.PREMIUM_ECONOMY)}>
                                PREMIUM ECONMY
                            </div>
                            <div className={styles.optionItem} onClick={() => setSeatClassDetail(ESeatClass.BASIC_ECONOMY)}>
                                BASIC ECONMY
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.addFlight}>
                        Add Flight
                    </div>  */}
                </div>
            </div>
            <div className={styles.flightDetail}>
                <div className={styles.header}>
                    <div className={styles.airlineInfo}>
                        <h5>Q Airline</h5>
                        <div className={styles.flightCode}>
                            <p>{flight?.flightCode}</p>
                            <div className={styles.status}>{flight?.status}</div>
                        </div>
                    </div>
                    <div className={styles.flightDate}>
                        Date {date}
                    </div>
                    <div className={styles.passengers}>
                        {passengers} passengers
                    </div>
                    <div className={styles.priceContainer}>
                        {groupFlightsBySeatClassData?.[`${seatClassDetail}`]?.[0]?.price}$ <span className={styles.pricePer}>/pax</span>    
                    </div> 
                    <div className={styles.addFlight} onClick={handleEditFlight}>
                        Edit
                    </div> 
                </div>
                <div className={styles.flightDetailContent}>
                    <div className={styles.timeContainer}>
                        <div className={styles.dateContainer}>
                            <p className={styles.hour}>
                                {startTime}
                            </p>
                            <p className={styles.date}>
                                {date}
                            </p>
                        </div>    
                        <div className={styles.duration}>
                            {durationFormatted}
                        </div>
                        <div className={styles.dateContainer}>
                            <p className={styles.hour}>
                                {endTime}
                            </p>
                            <p className={styles.date}>
                                {date}
                            </p>
                        </div> 
                    </div> 
                    <div className={styles.decoration}>
                        <div className={styles.circle}></div>
                        <div className={styles.line}></div>
                        <div className={styles.circle}></div>
                        <Image className={styles.image} src="/images/flights/airplane.png" width={32} height={32} unoptimized alt=""></Image>
                    </div>
                    <div className={styles.flightDetailInfoContainer}>
                    <div className={styles.airportInfoContainer}>
                        <p className={styles.location}>{flight?.fromAirport?.name}</p>
                        <p className={styles.airportCode}>{flight?.fromAirport?.code}</p>
                    </div>
                    <div className={styles.flightDetailInfo}>
                        <div className={styles.flightInfoList}>
                            <div className={styles.flightAirlineDetailInfo}>
                                Q Airline
                            </div>
                            <div className={styles.flightCode} >
                                {flight?.flightCode}
                            </div>
                        </div>
                        <div className={styles.seatInfo}>
                            <div className={styles.leftFlightContainer}>
                                <div className={styles.planeInfo}>
                                    <p className={styles.infoHeader}>
                                        Model
                                    </p>
                                    <p className={styles.infoContent}>
                                        {flight?.plane?.name}
                                    </p>
                                </div>
                                <div className={styles.planeInfo}>
                                    <p className={styles.infoHeader}>
                                        Class
                                    </p>
                                    <p className={styles.infoContent}>
                                        {seatClassDetail}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.rightFlightInfo}>
                                <div className={styles.planeInfo}>
                                    <p className={styles.infoHeader}>
                                        Seat Layout
                                    </p>
                                    <p className={styles.infoContent}>
                                        3 - 3 - 3 configuration
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.includeContainer}>
                            <h3>What's included</h3>
                            <div className={styles.rowContainer}>
                                <div className={styles.itemContainer}>
                                    <Image src="/images/flights/travel.png" alt="" width={12} height={12}></Image>
                                    Baggage 23kg - Cabin baggage 7kg
                                </div>
                                <div className={styles.itemContainer}>
                                    <Image src="/images/flights/dinner.png" alt="" width={12} height={12}></Image>
                                    Free Meal
                                </div>
                            </div>
                            <div className={styles.rowContainer}>
                                <div className={styles.itemColumnContainer}>
                                    <div style={{
                                        display: "flex",
                                        gap: "12px",
                                    }}>
                                        <Image src="/images/flights/return.png" alt="" width={12} height={12}></Image>
                                        Reschedule
                                    </div>
                                    <p className={styles.text}>Free rescheduling within 24 hours of booking</p>
                                </div>
                                <div className={styles.itemColumnContainer}>
                                    <div style={{
                                        display: "flex",
                                        gap: "12px",
                                    }}>
                                        <Image src="/images/flights/billing.png" alt="" width={12} height={12}></Image>
                                        Refund
                                    </div>
                                    <p className={styles.text}>Refunds available with a 10% cancellation fee if cancelled 48 hours before departure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.airportInfoContainer}>
                        <p className={styles.location}>{flight?.toAirport?.name}</p>
                        <p className={styles.airportCode}>{flight?.toAirport?.code}</p>
                    </div>
                </div>
                </div>
            </div>
        
            {isShowPopup && <FlightForm flight={flight} isDummy={isDummy} setIsDummy={setIsDummy} callback={closePopup} groupBySeatClassData={groupFlightsBySeatClassData!}></FlightForm>}
        </div>
    );
}