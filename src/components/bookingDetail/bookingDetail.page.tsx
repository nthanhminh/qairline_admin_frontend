'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
export interface BookingDetailPageProps {
    translate: any
}
  
export const BookingDetailPage: FC<BookingDetailPageProps> = ({
    translate
}) => {
    const bookings = [
        {
            flightCode: "QAL001",
            customerName: "Nicky",
            customerEmail: "nicky@gmail.com",
            customerSSID: "012345678912",
            seatClass: "Business",
        },
        {
            flightCode: "QAL002",
            customerName: "Alice",
            customerEmail: "alice@gmail.com",
            customerSSID: "987654321098",
            seatClass: "Economy",
        },
        {
            flightCode: "QAL002",
            customerName: "Alice",
            customerEmail: "alice@gmail.com",
            customerSSID: "987654321098",
            seatClass: "Economy",
        },
        {
            flightCode: "QAL002",
            customerName: "Alice",
            customerEmail: "alice@gmail.com",
            customerSSID: "987654321098",
            seatClass: "Economy",
        }
        // Add more booking objects here
    ];
    return (
        <div className={styles.bookingContainer}>
            <h2 className={styles.bookingHeader}>
                Booking Detail
            </h2>
            <div className={styles.bookingListContainer}>
                <table className={styles.bookingTable}>
                    <thead>
                        <tr>
                            <th>Flight Code</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer SSID</th>
                            <th>Seat Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td className={styles.bookingInfo}>{booking.flightCode}</td>
                                <td className={styles.bookingInfo}>{booking.customerName}</td>
                                <td className={styles.bookingInfo}>{booking.customerEmail}</td>
                                <td className={styles.bookingInfo}>{booking.customerSSID}</td>
                                <td className={styles.bookingInfo}>{booking.seatClass}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagesContainer}>
                    <div className={styles.pageItem}>
                        1
                    </div>
                    <div className={styles.pageItem}>
                        2
                    </div>
                    <div className={styles.pageItem}>
                        3
                    </div>
                </div>
            </div>
        </div>
    );
}