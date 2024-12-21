'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import BarChart from "./barChart";
import LineChart from "./lineChart";
import { getAllMenu } from "@/ultis/apis/menu.api";
import { BookingStatisticDetails, ETimeType, FlightChartData, FlightStatisticByAirportData, FlightStatisticDashboard, TicketChartData } from "@/ultis/type/statistic.type";
import { getFlightDataDashboard, getFlightChartData, getTicketChartData, getFlightStatisticByAirport, getBookingStatisticDetail, getAllTickets, getAllFlights } from "@/ultis/apis/statistic.api";
import { convertSecondsToHHMM, handleTime } from "@/ultis/helpers/time.helper";
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";
export interface DashBoardPageProps {
    translate: any
}
  
export const DashBoardPage: FC<DashBoardPageProps> = ({
    translate
}) => {
    const [flightDashboardData, setFlightDashboardData] = useState<FlightStatisticDashboard>({});
    const [flightChartData, setFlightChartData] = useState<FlightChartData[]>([]);
    const [ticketChartData, setTicketChartData] = useState<TicketChartData[]>([]);
    const [flightStatisticByAirport, setFlightStatisticByAirport] = useState<FlightStatisticByAirportData[]>([]);
    const [bookingData, setBookingData] = useState<BookingStatisticDetails[]>([]);
    const [timeType, setTimeType] = useState<ETimeType>(ETimeType.WEEK);
    const [ticketChartLabel, setTicketChartLabel] = useState<string[]>([]);
    const [ticketChartValue, setTicketChartValue] = useState<number[]>([]);
    const [flightChartValue, setFlightChartValue] = useState<number[]>([]);
    const [flightChartLabel, setFlightChartLabel] = useState<string[]>([]);
    const [totalTickets, setTotalTickets] = useState<number>(0);
    const [totalFlights, setTotalFlights] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {handleShowMessage} = useGlobalContext();
    const initData = async () => {
        try {
            setIsLoading(true);
            const [
                flightDashboardDataFromApi,
                flightChartDataFromApi,
                ticketChartDataFromApi,
                flightStatisticByAirportFromApi,
                bookingDataFromApi,
                totalTicketsFromApi,
                totalFlightsFromApi,
            ] = await Promise.all([
                getFlightDataDashboard(),
                getFlightChartData(),
                getTicketChartData(timeType),
                getFlightStatisticByAirport(),
                getBookingStatisticDetail(),
                getAllTickets(),
                getAllFlights()
            ])
            setFlightDashboardData(flightDashboardDataFromApi);
            setFlightChartData(flightChartDataFromApi);
            setTicketChartData(ticketChartDataFromApi);
            setFlightStatisticByAirport(flightStatisticByAirportFromApi);
            setBookingData(bookingDataFromApi);
            setTotalTickets(totalTicketsFromApi);
            setTotalFlights(totalFlightsFromApi);
            setIsLoading(false);
        } catch (error) {
            handleShowMessage(2, 'Error when fetching statistic data');
        }
    }

    useEffect(() => {
        const labels: string[] = [];
        const values: number[] = [];
        for(const ticketCharItem of ticketChartData) {
            labels.push(ticketCharItem?.period);
            values.push(ticketCharItem?.totalTickets);
        }
        setTicketChartLabel(labels);
        setTicketChartValue(values);
    }, [ticketChartData])

    useEffect(() => {
        const labels: string[] = [];
        const values: number[] = [];
        for(const flightChartItem of flightChartData) {
            labels.push(flightChartItem?.month);
            values.push(flightChartItem?.totalFlights);
        }
        setFlightChartLabel(labels);
        setFlightChartValue(values);
    }, [flightChartData])

    const fetchTicketChartData = async() => {
        try {
            const ticketChartDataFromApi = await getTicketChartData(timeType);
            setTicketChartData(ticketChartDataFromApi);
        } catch (error) {
            handleShowMessage(2, 'Error when fetching ticket chart data');
        }
    }

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        fetchTicketChartData();
    }, [timeType]);
    return (
        isLoading ?  <LottieAnimation></LottieAnimation> :
        <div className={styles.dashboardContainer}>
            <div className={styles.leftContainer}>
                <div className={`${styles.rowsContainer} ${styles.statisticContainer_}`}>
                    <div className={styles.statisticContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentName}>
                                Completed Flights
                            </div>
                            <div className={styles.contentCnt}>
                                {flightDashboardData?.["DONE"]?.flightsThisMonth}
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    {flightDashboardData?.["DONE"]?.diffrentLastMonth >= 0 ? <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> : <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image>}
                                    {/* <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> */}
                                </div>
                                <div className={styles.trendDiff}>
                                    {Math.abs(flightDashboardData?.["DONE"]?.diffrentLastMonth).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src='/images/dashboard/verify.png' alt="dashboardIcon" width={36} height={36} unoptimized></Image>
                        </div>
                    </div>
                    <div className={styles.statisticContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentName}>
                                Active Flights
                            </div>
                            <div className={styles.contentCnt}>
                                {flightDashboardData?.["ACTIVE"]?.flightsThisMonth}
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    {flightDashboardData?.["ACTIVE"]?.diffrentLastMonth >= 0 ? <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> : <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image>}
                                    {/* <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> */}
                                </div>
                                <div className={styles.trendDiff}>
                                    {Math.abs(flightDashboardData?.["ACTIVE"]?.diffrentLastMonth).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src='/images/dashboard/direct-flight.png' alt="dashboardIcon" width={42} height={42} unoptimized></Image>
                        </div>
                    </div>
                    <div className={styles.statisticContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentName}>
                                Cancelled Flights
                            </div>
                            <div className={styles.contentCnt}>
                                {flightDashboardData?.["CANCELLED"]?.flightsThisMonth}
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    {flightDashboardData?.["CANCELLED"]?.diffrentLastMonth >= 0 ? <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> : <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image>}
                                    {/* <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image> */}
                                </div>
                                <div className={styles.trendDiff}>
                                    {Math.abs(flightDashboardData?.["CANCELLED"]?.diffrentLastMonth).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src='/images/dashboard/cancelled.png' alt="dashboardIcon" width={36} height={36} unoptimized></Image>
                        </div>
                    </div>
                    <div className={styles.statisticContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentName}>
                                Total Revenue
                            </div>
                            <div className={styles.contentCnt}>
                                {flightDashboardData?.["REVENUE"]?.flightsThisMonth}
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    {flightDashboardData?.["REVENUE"]?.diffrentLastMonth >= 0 ? <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> : <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image>}
                                    {/* <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image> */}
                                </div>
                                <div className={styles.trendDiff}>
                                    {Math.abs(flightDashboardData?.["REVENUE"]?.diffrentLastMonth).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <Image src='/images/dashboard/revenue.png' alt="dashboardIcon" width={36} height={36} unoptimized></Image>
                        </div>
                    </div>
                </div>
                <div className={styles.rowsContainer}>
                    <div className={styles.ticketContainer}>
                        <div className={styles.firstRow}>
                            <div className={styles.rowName}>
                                Ticket Sales
                            </div>
                            <div className={styles.timeTypeContainer}>
                                <div className={styles.timeTypeIcon}>
                                    <Image src="/images/dashboard/schedule.png" width={16} height={16} alt="picture" unoptimized></Image>
                                </div>
                                <div className={styles.timeTypeValue}>
                                    {timeType}
                                </div>
                                <div className={styles.timeTypeIcon}>
                                    <Image src="/images/dashboard/arrow.png" width={12} height={12} alt="picture" unoptimized></Image>
                                </div>
                                <div className={styles.timeTypeOptionContainer}>
                                {
                                    Object.keys(ETimeType).map((key) => (
                                        <div key={key} className={styles.timeTypeOption} onClick={() => {setTimeType(ETimeType[key as keyof typeof ETimeType])}}>
                                            {ETimeType[key as keyof typeof ETimeType]}
                                        </div>
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.below_container}>
                        <div className={styles.secondRow}>
                            <span className={styles.secondeRowCount}>
                                {totalTickets}
                            </span>
                            <span className={styles.secondeRowName}>
                                Tickets Sold
                            </span>
                        </div>
                        <div className={styles.content}>
                            <BarChart labels={ticketChartLabel} data={ticketChartValue} label="Tickets"></BarChart>
                        </div>
                        </div>
                    </div>
                    <div className={styles.ticketContainer}>
                        <div className={styles.firstRow}>
                            <div className={styles.rowName}>
                                Flight Schedule
                            </div>
                            <div className={styles.timeTypeContainer}>
                                <div className={styles.timeTypeIcon}>
                                    <Image src="/images/dashboard/schedule.png" width={16} height={16} alt="picture" unoptimized></Image>
                                </div>
                                <div className={styles.timeTypeValue}>
                                    Eight Months
                                </div>
                            </div>
                        </div>
                        <div className={styles.below_container}>
                        <div className={styles.secondRow}>
                            <span className={styles.secondeRowCount}>
                                {totalFlights}
                            </span>
                            <span className={styles.secondeRowName}>
                                Flights
                            </span>
                        </div>
                        <div className={styles.content}>
                            <LineChart labels={flightChartLabel} data={flightChartValue} label="Flight"></LineChart>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rowsContainer}>
                    <div className={styles.bookingContainer}>
                        <div className={styles.headerName}>Bookings</div>
                        {
                            bookingData.map((booking, index) => {
                                const {startTime, endTime, date} = handleTime(booking.departuretime!, booking.duration!);
                                const durationFormatted = convertSecondsToHHMM(booking.duration!);
                                return (
                                    <div className={styles.bookingItemContainer} key={index}>
                                        <div className={styles.bookingInfoContainer}>
                                            <div className={styles.bookingNameHeader}>Q Airline</div>
                                            <div className={styles.numberInfo}>
                                                <div className={styles.dateInfo}>
                                                    <Image src="/images/dashboard/schedule.png" width={12} height={12} alt="" unoptimized></Image>
                                                    <div className={styles.bookingInfo}>{date}</div>
                                                </div>
                                                <div className={styles.passengerInfo}>
                                                    <Image src="/images/dashboard/candidate.png" width={12} height={12} alt="" unoptimized></Image>
                                                    <div className={styles.bookingInfo}>{booking?.flighttickets?.length ?? 0}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.flightInfoContainer}>
                                            <div className={styles.timeBookingContainer}>
                                                <div className={styles.bookingNameHeader}>
                                                    {startTime}
                                                </div>
                                                <div className={styles.bookingInfo}>
                                                    {booking.fromairportname}
                                                </div>
                                            </div>
                                            <div className={styles.airportContainer}>
                                                <div className={styles.bookingInfo}>
                                                    Duration: {durationFormatted}
                                                </div>
                                                <div className={styles.bookingDecoration}>
                                                    <div className={styles.circle}></div>
                                                    <div className={styles.line}></div>
                                                    <div className={styles.circle}></div>
                                                </div>
                                                <div className={styles.bookingAirportContainer}>
                                                    <div className={`${styles.bookingInfo} ${styles.airportNameLeft}`}>
                                                        {booking?.fromairportcode}
                                                    </div>
                                                    <div className={`${styles.bookingInfo} ${styles.airportNameRight}`}>
                                                        {booking?.toairportcode}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.timeBookingContainer}>
                                                <div className={styles.bookingNameHeader}>
                                                    {endTime}
                                                </div>
                                                <div className={styles.bookingInfo}>
                                                    {booking.toairportname}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.topFlightRoutesContainer}>
                    <div className={styles.headerName}>
                        Top Flight Routes
                    </div>
                    {
                        flightStatisticByAirport.map((flight,index) => {
                            return (
                                <div className={styles.topFlightItemContainer} key={index}>
                                    <div className={styles.flightInfo}>
                                        {flight.fromairportname}({flight.fromairportcode}) - {flight.toairportname}({flight.toairportcode})
                                    </div>
                                    <div className={styles.passengers}>
                                        <div className={styles.passengersFlightCount} style={{width: `${(flight.totalflights / (totalFlights > 0 ? totalFlights : 1) * 100.0) > 10 ? (flight.totalflights / (totalFlights > 0 ? totalFlights : 1) * 100.0) : 10}%`}}>
                                            <p className={styles.passengersCount}>{flight.totalflights} flights</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            </div>
            {/* <div className={styles.leftContainer}>
                <div className={styles.topFlightRoutesContainer}>
                    <div className={styles.headerName}>
                        Top Flight Routes
                    </div>
                    <div className={styles.topFlightItemContainer}>
                        <div className={styles.flightInfo}>
                            Paris(CDG) - New York(JFK)
                        </div>
                        <div className={styles.passengers}>
                            <div className={styles.passengersFlightCount}>
                                <p className={styles.passengersCount}>140000 passengers</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.topFlightItemContainer}>
                        <div className={styles.flightInfo}>
                            Paris(CDG) - New York(JFK)
                        </div>
                        <div className={styles.passengers}>
                            <div className={styles.passengersFlightCount}>
                                <p className={styles.passengersCount}>140000 passengers</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.topFlightItemContainer}>
                        <div className={styles.flightInfo}>
                            Paris(CDG) - New York(JFK)
                        </div>
                        <div className={styles.passengers}>
                            <div className={styles.passengersFlightCount}>
                                <p className={styles.passengersCount}>140000 passengers</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.topFlightItemContainer}>
                        <div className={styles.flightInfo}>
                            Paris(CDG) - New York(JFK)
                        </div>
                        <div className={styles.passengers}>
                            <div className={styles.passengersFlightCount}>
                                <p className={styles.passengersCount}>140000 passengers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}