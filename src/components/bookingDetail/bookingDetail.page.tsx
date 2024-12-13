'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { Flight, Ticket } from "@/ultis/type/flight.type";
import { getFlighById } from "@/ultis/apis/flight.api";
export interface BookingDetailPageProps {
    translate: any,
    id: string
}
  
export const BookingDetailPage: FC<BookingDetailPageProps> = ({
    translate,
    id,
}) => {
    const [flight, setFlight] = useState<Flight | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const pageSize = 10;
    const fetchData = async () => {
        const flight = await getFlighById(id);
        setFlight(flight);
        const tmpTicketList: Ticket[] = [];
        for (const booking of flight?.bookings || []) {
            tmpTicketList.push(...(booking.tickets ?? []));
        }
        console.log(flight);
        setTickets(tmpTicketList);
        setTotalPages(tmpTicketList.length);
        setPageNumber(Math.ceil(tmpTicketList.length/pageSize));
    }
    useEffect(() => {
        fetchData();
    }, [])

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
                        {tickets.map((booking, index) => {
                            const start = pageSize * (page - 1);
                            const end = start + pageSize;
                            if(index >= start && index < end ) {
                                return (
                                    <tr key={index}>
                                        <td className={styles.bookingInfo}>{flight?.flightCode}</td>
                                        <td className={styles.bookingInfo}>{booking.customerName}</td>
                                        <td className={styles.bookingInfo}>{booking.customerEmail}</td>
                                        <td className={styles.bookingInfo}>{booking.customerSSID}</td>
                                        <td className={styles.bookingInfo}>{booking.seatClass}</td>
                                    </tr>
                                )
                            } else {
                                return <></>
                            }
                        })}
                    </tbody>
                </table>
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