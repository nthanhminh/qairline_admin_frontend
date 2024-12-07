'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import FlightForm from "../edit/flight/editFlight.page";
export interface FlightDetailPageProps {
    translate: any
}
  
export const FlightDetailPage: FC<FlightDetailPageProps> = ({
    translate
}) => {
    return (
        <div className={styles.flightDetailContainer}>
            <div className={styles.headerFlightDetailContainer}>
                <div className={styles.descriptionContainer}>
                    <div className={styles.backBtn}>
                        <Image src="/images/flights/back.png" alt="" width={18} height={18}></Image>
                    </div>
                    <div className={styles.flightInfoContainer}>
                        <div className={styles.flightInfo}>
                            QAL001
                        </div>
                        <div className={styles.aiport}>
                            Los Angeles - New York
                        </div>
                        <div className={styles.flightInfo}>
                            Boeing 787 Dreamliner - 220 Passengers
                        </div>
                    </div>
                </div>
                <div className={styles.leftContainer}>
                    <div className={styles.sortBy}>
                        ECONOMY
                        <Image src="/images/dashboard/arrow.png" alt="" width={12} height={12}></Image>
                        <div className={styles.optionContainer}>
                            <div className={styles.optionItem}>
                                ECONOMY
                            </div>
                            <div className={styles.optionItem}>
                                BUSINESS
                            </div>
                            <div className={styles.optionItem}>
                                PREMIUM ECONMY
                            </div>
                            <div className={styles.optionItem}>
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
                            <p>QAL001</p>
                            <div className={styles.status}>On time</div>
                        </div>
                    </div>
                    <div className={styles.flightDate}>
                        Date July 1, 2018
                    </div>
                    <div className={styles.passengers}>
                        208 passengers
                    </div>
                    <div className={styles.priceContainer}>
                        350$ <span className={styles.pricePer}>/pox</span>    
                    </div> 
                    <div className={styles.addFlight}>
                        Edit
                    </div> 
                </div>
                <div className={styles.flightDetailContent}>
                    <div className={styles.timeContainer}>
                        <div className={styles.dateContainer}>
                            <p className={styles.hour}>
                                06:00
                            </p>
                            <p className={styles.date}>
                                15 jul, 2028
                            </p>
                        </div>    
                        <div className={styles.duration}>
                            13 hours
                        </div>
                        <div className={styles.dateContainer}>
                            <p className={styles.hour}>
                                09:00
                            </p>
                            <p className={styles.date}>
                                15 jul, 2028
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
                        <p className={styles.location}>Los Angeles</p>
                        <p className={styles.airportCode}>LAX</p>
                    </div>
                    <div className={styles.flightDetailInfo}>
                        <div className={styles.flightInfoList}>
                            <div className={styles.flightAirlineDetailInfo}>
                                Q Airline
                            </div>
                            <div className={styles.flightCode}>
                                QAL001
                            </div>
                        </div>
                        <div className={styles.seatInfo}>
                            <div className={styles.leftFlightContainer}>
                                <div className={styles.planeInfo}>
                                    <p className={styles.infoHeader}>
                                        Model
                                    </p>
                                    <p className={styles.infoContent}>
                                        Boeing 787 Dreamliner
                                    </p>
                                </div>
                                <div className={styles.planeInfo}>
                                    <p className={styles.infoHeader}>
                                        Class
                                    </p>
                                    <p className={styles.infoContent}>
                                        Economy
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
                        <p className={styles.location}>Los Angeles</p>
                        <p className={styles.airportCode}>LAX</p>
                    </div>
                </div>
                </div>
            </div>
            {/* <div className={styles.overlay}>
                <div className={styles.editFlightContainer}>
                    <div className={styles.overlayContent}>
                        <h3 style={{textAlign: "center", width: "100%"}}>Flight</h3>
                        <div className={styles.itemContainer}>
                            <label className={styles.label} htmlFor="name">Name</label>
                            <input className={styles.input} type="text" name="name" id="name" placeholder="name" required/>
                        </div>
                        <div className={styles.itemContainer}>
                            <label className={styles.label} htmlFor="code">Flight Code</label>
                            <input className={styles.input} type="text" name="code" id="code" placeholder="code" required/>
                        </div>
                        <div className={styles.itemContainer}>
                            <label className={styles.label} htmlFor="departureTime">DepartureTime</label>
                            <input className={styles.input} type="text" name="departureTime" id="departureTime" placeholder="dd-mm-yyyy hh:mm:ss" required/>
                        </div>
                        <div className={styles.itemContainer}>
                            <label className={styles.label} htmlFor="duration">Duration</label>
                            <input className={styles.input} type="text" name="duration" id="duration" placeholder="hh:mm:ss" required/>
                        </div>
                        <div className={styles.itemContainer}>
                            <label className={styles.label} htmlFor="plane">Aircraft</label>
                            <select size={1} className={`${styles.input} ${styles.select}`} name="plane" id="plane" required>
                                    <option value="">Select an aircraft</option>
                                    <option value="boeing737">Boeing 737</option>
                                    <option value="airbusA320">Airbus A320</option>
                                    <option value="cessna172">Cessna 172</option>
                                    <option value="gulfstreamG650">Gulfstream G650</option>
                            </select>
                        </div>
                        <div className={styles.rowAddContainer}>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="windowPrice">Window Seat Price</label>
                                <input className={styles.input} type="text" name="windowPrice" id="windowPrice" placeholder="0" required/>
                            </div>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="aislePrice">Aisle Seat Price</label>
                                <input className={styles.input} type="text" name="aislePrice" id="aislePrice" placeholder="0" required/>
                            </div>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="exitSeat">Exit Row Seat Price</label>
                                <input className={styles.input} type="text" name="exitSeat" id="exitSeat" placeholder="0" required/>
                            </div>
                        </div>
                        <div className={styles.rowAddContainer}>
                        <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="BusinessPrice">Business Class Price</label>
                                <input className={styles.input} type="text" name="BusinessPrice" id="BusinessPrice" placeholder="0" required/>
                            </div>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="premium_economy">Premium Economy Price</label>
                                <input className={styles.input} type="text" name="premium_economy" id="premium_economy" placeholder="0" required/>
                            </div>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="economy">Economy Class Price</label>
                                <input className={styles.input} type="text" name="economy" id="economy" placeholder="0" required/>
                            </div>
                            <div className={styles.itemContainer}>
                                <label className={styles.label} htmlFor="basic_economy">Basic Economy Class Price</label>
                                <input className={styles.input} type="text" name="basic_economy" id="basic_economy" placeholder="0" required/>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button}>Save</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <FlightForm></FlightForm>
        </div>
    );
}