'use client';

import { FC, useEffect, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css"
import Image from "next/image";
import DatePicker from "react-datepicker";
import CustomDatePicker from "../datePicker/datePicker";
export interface FlightPageProps {
    translate: any
}
  
export const FlightPage: FC<FlightPageProps> = ({
    translate
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const pageSize:number = 4;
    return (
        <div className={styles.flightContainer}>
            <h2 className={styles.flightHeader}>
                Flights
            </h2>
            <div className={styles.flightSearchContainer}>
                <div className={styles.airportSearch}>
                    <label htmlFor="fromAirport">From</label>
                    <input type="text" name="fromAirport" id="fromAirport" className={styles.input}/>
                </div> 
                <div className={styles.exchangeBtn}>
                    <Image src="/images/flights/transfer.png" alt="" width={20} height={20} unoptimized></Image>
                </div>
                <div className={styles.airportSearch}>
                    <label htmlFor="toAirport">To</label>
                    <input type="text" name="toAirport" id="toAirport" className={styles.input} />
                </div> 
                <CustomDatePicker></CustomDatePicker>
                <div className={styles.SearchBtn}>
                    <Image src="/images/flights/search.png" width={24} height={24} unoptimized alt=""></Image>
                </div>
            </div>
            <div className={styles.fligthList}>
                <h5 className={styles.fligthListName}>
                    Fligth List
                </h5>
                <div className={styles.functionalBtnContainer}>
                    <div className={styles.functionalDes}>
                        Sort by
                    </div>
                    <div className={styles.sortBy}>
                        
                    </div> 
                </div>
            </div>
            <div className={styles.contentContainer}>
            <div className={styles.flightListContainer}>
                <div className={styles.flightItemContainer}>
                    <div className={styles.flightItemInfo}>
                        <Image src='/images/flights/paper-plane.png' width={28} height={28} alt="" unoptimized></Image>
                        <div className={styles.airlineInfo}>
                            <h5 className={styles.airlineName}>
                                Q Airline
                            </h5>
                            <p className={styles.flightInfo}>
                                QA001
                            </p>
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>06:00</p>
                            <p className={styles.flightInfo}>Los Angeles</p>
                        </div>
                        <div className={styles.durationContainer}>
                            <div className={styles.flightInfoContainer}>
                                <div className={styles.flightInfo}>
                                    LAX
                                </div>
                                <div className={styles.decoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                    <Image src="/images/icons/departure.png" alt="" width={12} height={12} unoptimized></Image>
                                </div>
                                <div className={styles.flightInfo}>
                                    JFK
                                </div>
                            </div>
                            <div className={styles.durationDetail}>
                                Duration: 1h30m</div> 
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>09:00</p>
                            <p className={styles.flightInfo}>New York</p>
                        </div>
                    </div>
                    <div className={styles.priceAndClassInfo}>
                        <div className={styles.priceFacility}>
                            <p>Facility</p>
                            <div className={styles.advantage}>
                                <Image src='/images/flights/travel.png' alt="" width={16} height={16}></Image>
                                <div className={styles.classInfo}>
                                    1baggage
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
                                $350 <span className={styles.unit}>/ pox</span>
                            </div>
                            <div className={styles.viewDetail}>
                                View Detail
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.flightItemContainer}>
                    <div className={styles.flightItemInfo}>
                        <Image src='/images/flights/paper-plane.png' width={28} height={28} alt="" unoptimized></Image>
                        <div className={styles.airlineInfo}>
                            <h5 className={styles.airlineName}>
                                Q Airline
                            </h5>
                            <p className={styles.flightInfo}>
                                QA001
                            </p>
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>06:00</p>
                            <p className={styles.flightInfo}>Los Angeles</p>
                        </div>
                        <div className={styles.durationContainer}>
                            <div className={styles.flightInfoContainer}>
                                <div className={styles.flightInfo}>
                                    LAX
                                </div>
                                <div className={styles.decoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                    <Image src="/images/icons/departure.png" alt="" width={12} height={12} unoptimized></Image>
                                </div>
                                <div className={styles.flightInfo}>
                                    JFK
                                </div>
                            </div>
                            <div className={styles.durationDetail}>
                                Duration: 1h30m</div> 
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>09:00</p>
                            <p className={styles.flightInfo}>New York</p>
                        </div>
                    </div>
                    <div className={styles.priceAndClassInfo}>
                        <div className={styles.priceFacility}>
                            <p>Facility</p>
                            <div className={styles.advantage}>
                                <Image src='/images/flights/travel.png' alt="" width={16} height={16}></Image>
                                <div className={styles.classInfo}>
                                    1baggage
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
                                $350 <span className={styles.unit}>/ pox</span>
                            </div>
                            <div className={styles.viewDetail}>
                                View Detail
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.flightItemContainer}>
                    <div className={styles.flightItemInfo}>
                        <Image src='/images/flights/paper-plane.png' width={28} height={28} alt="" unoptimized></Image>
                        <div className={styles.airlineInfo}>
                            <h5 className={styles.airlineName}>
                                Q Airline
                            </h5>
                            <p className={styles.flightInfo}>
                                QA001
                            </p>
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>06:00</p>
                            <p className={styles.flightInfo}>Los Angeles</p>
                        </div>
                        <div className={styles.durationContainer}>
                            <div className={styles.flightInfoContainer}>
                                <div className={styles.flightInfo}>
                                    LAX
                                </div>
                                <div className={styles.decoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                    <Image src="/images/icons/departure.png" alt="" width={12} height={12} unoptimized></Image>
                                </div>
                                <div className={styles.flightInfo}>
                                    JFK
                                </div>
                            </div>
                            <div className={styles.durationDetail}>
                                Duration: 1h30m</div> 
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>09:00</p>
                            <p className={styles.flightInfo}>New York</p>
                        </div>
                    </div>
                    <div className={styles.priceAndClassInfo}>
                        <div className={styles.priceFacility}>
                            <p>Facility</p>
                            <div className={styles.advantage}>
                                <Image src='/images/flights/travel.png' alt="" width={16} height={16}></Image>
                                <div className={styles.classInfo}>
                                    1baggage
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
                                $350 <span className={styles.unit}>/ pox</span>
                            </div>
                            <div className={styles.viewDetail}>
                                View Detail
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.flightItemContainer}>
                    <div className={styles.flightItemInfo}>
                        <Image src='/images/flights/paper-plane.png' width={28} height={28} alt="" unoptimized></Image>
                        <div className={styles.airlineInfo}>
                            <h5 className={styles.airlineName}>
                                Q Airline
                            </h5>
                            <p className={styles.flightInfo}>
                                QA001
                            </p>
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>06:00</p>
                            <p className={styles.flightInfo}>Los Angeles</p>
                        </div>
                        <div className={styles.durationContainer}>
                            <div className={styles.flightInfoContainer}>
                                <div className={styles.flightInfo}>
                                    LAX
                                </div>
                                <div className={styles.decoration}>
                                    <div className={styles.circle}></div>
                                    <div className={styles.line}></div>
                                    <div className={styles.circle}></div>
                                    <Image src="/images/icons/departure.png" alt="" width={12} height={12} unoptimized></Image>
                                </div>
                                <div className={styles.flightInfo}>
                                    JFK
                                </div>
                            </div>
                            <div className={styles.durationDetail}>
                                Duration: 1h30m</div> 
                        </div>
                        <div className={styles.airportInfo}>
                            <p className={styles.airlineName}>09:00</p>
                            <p className={styles.flightInfo}>New York</p>
                        </div>
                    </div>
                    <div className={styles.priceAndClassInfo}>
                        <div className={styles.priceFacility}>
                            <p>Facility</p>
                            <div className={styles.advantage}>
                                <Image src='/images/flights/travel.png' alt="" width={16} height={16}></Image>
                                <div className={styles.classInfo}>
                                    1baggage
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
                                $350 <span className={styles.unit}>/ pox</span>
                            </div>
                            <div className={styles.viewDetail}>
                                View Detail
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.pageContainer}>
                {Array.from({ length: pageSize }, (_, i) => (
                    <button key={i} className={styles.pageButton}>
                        {i + 1}
                    </button>
                ))}
            </div>
            </div>
        </div>
    );
}