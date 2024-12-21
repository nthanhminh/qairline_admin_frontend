'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import { Plane } from "@/ultis/type/plane.type";
import { deletePlane, getAllPlane } from "@/ultis/apis/plane.api";
import AircraftForm from "../edit/aircraft/editAircraft.page";
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";
export interface AircraftPageProps {
    translate: any
}
  
export const AircraftPage: FC<AircraftPageProps> = ({
    translate
}) => {
    const [planes, setPlane] = useState<Plane[]>([]);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [planeChange, setPlaneChange] = useState<Plane | null>(null);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const { handleShowMessage } = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const planeResponse = await getAllPlane() ?? [];
            const planeList = planeResponse.items;
            setPlane(planeList);
            setIsLoading(false);
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const handleEditPlane = async (plane: Plane) => {
        setPlaneChange(plane);
        setIsShowPopup(true);
    }

    const handleCreatePlane = async () => {
        setPlaneChange(null);
        setIsShowPopup(true);
    }

    const closePopup = () => {
        setIsShowPopup(false);
    }

    const removePlane = async (id: string) => {
        try {
            const result = await deletePlane(id);
            setIsDummy(!isDummy)
        } catch (error) {
            handleShowMessage(2, 'Delete aircraft failed');
        }
    }

    useEffect(() => {
        fetchData()
    }, [isDummy]);

    return (
        isLoading ? <LottieAnimation></LottieAnimation> : 
        (
            <div className={styles.aircraftContainer}>
                <div className={styles.airCraftHeader}>
                    <h2 className={styles.bookingHeader}>
                        Aircraft
                    </h2>
                    <button className={styles.btn} onClick={() => handleCreatePlane()}>Add Aircraft</button>
                </div>
                <div className={styles.listContainer}>
                    {
                        planes.map((plane, index) => {
                            return (
                                <div className={styles.itemContainer} key={index}>
                                    <div className={styles.row}>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>{plane.name}</p>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Type</p>
                                            <p className={styles.info}>{plane.type}</p>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Seat Configuration</p>
                                            <p className={styles.info}>3 - 3 -3</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Business</p>
                                            <p className={styles.info}>{plane.seatLayoutId.numberOfBusinessSeats}</p>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Premium Economy</p>
                                            <p className={styles.info}>{plane.seatLayoutId.numberOfPreminumEconomySeats}</p>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Economy</p>
                                            <p className={styles.info}>{plane.seatLayoutId.numberOfEconomySeats}</p>
                                        </div>
                                        <div className={styles.infoContainer}>
                                            <p className={styles.header}>Basic Economy</p>
                                            <p className={styles.info}>{plane.seatLayoutId.numberOfBasicSeats}</p>
                                        </div>
                                    </div>
                                    <div className={styles.row}>
                                        <p className={styles.description}>{plane.description}</p>
                                    </div>
                                    <div className={styles.row}>
                                        <button className={styles.btn} onClick={() => handleEditPlane(plane)}>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {isShowPopup && <AircraftForm callback={closePopup} setIsDummy={setIsDummy} isDummy={isDummy} plane={planeChange}/>}
            </div>
        )
    );
}