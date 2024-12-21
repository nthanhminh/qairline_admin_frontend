'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import MenuForm from "../edit/menu/editMenu.page";
import { Service } from "@/ultis/type/service.type";
import { deleteService, getAllServices } from "@/ultis/apis/service.api";
import ServiceForm from "../edit/services/editService.page";
import { DataGroupByType } from "@/ultis/type/commom.type";
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";
export interface ServicePageProps {
    translate: any
}
  
export const ServicePage: FC<ServicePageProps> = ({
    translate
}) => {
    const [services, setServices] = useState<DataGroupByType<Service>[]>([]);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [serviceChange, setServiceChange] = useState<Service | null>(null);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const {handleShowMessage} = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const serviceList = await getAllServices() ?? [];
            setServices(serviceList);
            setIsLoading(false)
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const handleEditService = async (service: Service) => {
        setIsShowPopup(true);
        setServiceChange(service);
    }

    const handleCreateNewService = async () => {
        setIsShowPopup(true);
        setServiceChange(null);
    }

    const closePopup = () => {
        setIsShowPopup(false);
    }

    const removeService = async (id: string) => {
        try {
            const result = await deleteService(id);
            handleShowMessage(1, 'Delete service successfully');
            setIsDummy(!isDummy)
        } catch (error) {
            handleShowMessage(2, 'Delete service failed');
        }
    }

    useEffect(() => {
        fetchData()
    }, [isDummy]);

    return (
        isLoading ? <LottieAnimation></LottieAnimation> :
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Service</h2>
                <button className={styles.addItem} onClick={handleCreateNewService}>Add Item</button>
            </div>
            {
                services.map(({type, items}, index) => {
                    return (
                        <div className={styles.typeContainer} key={index}>
                        <h3>{type}</h3>
                        <div className={styles.listContainer}>
                        {
                            items.map((service, index) => {
                                return (
                                    <div className={styles.itemContainer} key={index}>
                                        <div className={styles.imageContainer}>
                                            <Image className={styles.image} src={service.imageUrl!} alt="" width={200} height={200} unoptimized></Image>
                                        </div>    
                                        <div className={styles.description}>
                                            <p className={styles.name}>{service.name}</p>
                                            <div className={styles.priceContainer}>
                                                <p className={styles.price}>{service.price}$</p>
                                                <button className={styles.editItem} onClick={() => handleEditService(service)}>Edit</button>
                                                <div className={styles.deleteBtn} onClick={() => removeService(service.id!)}>
                                                    <Image src="/images/delete.png" alt="" width={20} height={20} unoptimized></Image>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.serviceDes}>
                                                {service.description}
                                            </div>
                                        </div>   
                                    )
                            })
                        }
                            </div> 
                    </div>
                    )
                })
            }
            {isShowPopup && <ServiceForm service={serviceChange} callback={closePopup} isDummy={isDummy} setIsDummy={setIsDummy}/>}
        </div>
    );
}