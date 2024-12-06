'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import BarChart from "./barChart";
import LineChart from "./lineChart";
export interface DashBoardPageProps {
    translate: any
}
  
export const DashBoardPage: FC<DashBoardPageProps> = ({
    translate
}) => {

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.rowsContainer}>
                    <div className={styles.statisticContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentName}>
                                Completed Flights
                            </div>
                            <div className={styles.contentCnt}>
                                125
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image>
                                </div>
                                <div className={styles.trendDiff}>
                                    5.32%
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
                                80
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image>
                                </div>
                                <div className={styles.trendDiff}>
                                    3.68%
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
                                25
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    <Image src='/images/dashboard/decrease.png' alt="" width={20} height={20} unoptimized></Image>
                                </div>
                                <div className={styles.trendDiff}>
                                    1.45%
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
                                125
                            </div>
                            <div className={styles.trend}>
                                <div className={styles.trendImage}>
                                    <Image src='/images/dashboard/growth.png' alt="" width={20} height={20} unoptimized></Image>
                                </div>
                                <div className={styles.trendDiff}>
                                    5.32%
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
                                    This Week
                                </div>
                                <div className={styles.timeTypeIcon}>
                                <Image src="/images/dashboard/arrow.png" width={12} height={12} alt="picture" unoptimized></Image>
                                </div>
                            </div>
                        </div>
                        <div className={styles.below_container}>
                        <div className={styles.secondRow}>
                            <span className={styles.secondeRowCount}>
                                12,500
                            </span>
                            <span className={styles.secondeRowName}>
                                Tickets Sold
                            </span>
                        </div>
                        <div className={styles.content}>
                            <BarChart></BarChart>
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
                                    This Week
                                </div>
                                <div className={styles.timeTypeIcon}>
                                <Image src="/images/dashboard/arrow.png" width={12} height={12} alt="picture" unoptimized></Image>
                                </div>
                            </div>
                        </div>
                        <div className={styles.below_container}>
                        <div className={styles.secondRow}>
                            <span className={styles.secondeRowCount}>
                                12,500
                            </span>
                            <span className={styles.secondeRowName}>
                                Tickets Sold
                            </span>
                        </div>
                        <div className={styles.content}>
                            <LineChart></LineChart>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rowsContainer}>
                    <div className={styles.bookingContainer}>
                        <div className={styles.headerName}>Bookings</div>
                        <div className={styles.bookingItemContainer}>
                            <div className={styles.bookingInfoContainer}>
                                <div className={styles.bookingNameHeader}>Q Airline</div>
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
                                    <div className={styles.bookingInfo}>
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
                        </div>
                    </div>
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