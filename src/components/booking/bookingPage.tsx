'use client';

import { FC, useEffect, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css"
import Image from "next/image";
export interface BookingPageProps {
    translate: any
}
  
export const BookingPage: FC<BookingPageProps> = ({
    translate
}) => {

    return (
        <div className={styles.bookingContainer}>
            <h2 className={styles.bookingHeader}>
                Bookings
            </h2>
            <div className={styles.bookingListContainer}>
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
                </div>
            </div>
        </div>
    );
}