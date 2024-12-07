'use client';

import { FC, useEffect, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css"
import Image from "next/image";
import AircraftForm from "../edit/aircraft/editAircraft.page";
export interface AircraftPageProps {
    translate: any
}
  
export const AircraftPage: FC<AircraftPageProps> = ({
    translate
}) => {

    return (
        <div className={styles.aircraftContainer}>
            <div className={styles.airCraftHeader}>
                <h2 className={styles.bookingHeader}>
                    Aircraft
                </h2>
                <button className={styles.btn}>Add Aircraft</button>
            </div>
            <div className={styles.listContainer}>
                <div className={styles.itemContainer}>
                    <div className={styles.row}>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Boeing 757</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Type</p>
                            <p className={styles.info}>A310</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Seat Configuration</p>
                            <p className={styles.info}>3 - 3 -3</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Business</p>
                            <p className={styles.info}>50</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Premium Economy</p>
                            <p className={styles.info}>50</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Economy</p>
                            <p className={styles.info}>50</p>
                        </div>
                        <div className={styles.infoContainer}>
                            <p className={styles.header}>Basic Economy</p>
                            <p className={styles.info}>50</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <p className={styles.description}>This is a plane</p>
                    </div>
                    <div className={styles.row}>
                        <button className={styles.btn}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
            <AircraftForm/>
        </div>
    );
}