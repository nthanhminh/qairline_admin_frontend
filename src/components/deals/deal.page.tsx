'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { DataGroupByType } from "@/ultis/type/commom.type";
import { ENewsType, News } from "@/ultis/type/deal.type";
import { deleteNews, getAllNews } from "@/ultis/apis/deal.api";
import NewForm from "../edit/news/editNews.page";
import moment from 'moment';
import { useGlobalContext } from "@/contexts/global.context";
import LottieAnimation from "../loading/loadingForPage/loadingPage";
export interface DealPageProps {
    translate: any
}
  
export const DealPage: FC<DealPageProps> = ({
    translate
}) => {
    const [deals, setDeals] = useState<DataGroupByType<News>[]>([]);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const [dealChange, setDealChange] = useState<News | null>(null);
    const [isDummy, setIsDummy] = useState<boolean>(false);
    const {handleShowMessage} = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const menuList = await getAllNews() ?? [];
            console.log(menuList);
            setDeals(menuList);
            setIsLoading(false);
        } catch (error) {
            handleShowMessage(2, 'Error when fetching data');
        }
    }

    const handleEditNews = async (deal: News) => {
        setDealChange(deal);
        setIsShowPopup(true);
    }

    const handleCreateNews = async () => {
        setDealChange(null);
        setIsShowPopup(true);
    }

    const closePopup = () => {
        setIsShowPopup(false);
    }

    const removeMenu = async (id: string) => {
        try {
            const result = await deleteNews(id);
            setIsDummy(!isDummy);
            handleShowMessage(1, "Delete news successfully");
        } catch (error) {
            handleShowMessage(2, "Delete news failed");
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
                <button className={styles.addItem} onClick={() => handleCreateNews()}>Add Item</button>
            </div>
            {
                deals.map(({type, items}, index) => {
                    return (
                        <div className={styles.typeContainer} key={index}>
                            <h3>{type}</h3>
                            <div className={styles.listContainer}>
                                {
                                    type === ENewsType.NEWS ? 
                                        items.map((item,index) => {
                                            return (
                                                <div className={styles.itemContainer} key={index}>
                                                    <div className={styles.imageContainer}>
                                                        <Image className={styles.image} src={item.imageUrl!} alt="" width={200} height={200} unoptimized></Image>
                                                    </div>    
                                                    <div className={styles.description}>
                                                        <p className={styles.name}>{item.title}</p>
                                                        <div className={styles.priceContainer}>
                                                            {/* <p className={styles.price}>{type.p}$</p> */}
                                                            <button className={styles.editItem} onClick={() => handleEditNews(item)}>Edit</button>
                                                            <div className={styles.deleteBtn} onClick={() => removeMenu(item.id!)}>
                                                                <Image src="/images/delete.png" alt="" width={20} height={20} unoptimized></Image>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.serviceDes}>
                                                        {item.content}
                                                    </div>
                                                </div> 
                                            )
                                        })
                                     : 
                                        items.map((item,index) => {
                                            const formattedDate = moment(item.endTime).format('DD/MM/YYYY HH:mm:ss');
                                            return (
                                                <div className={styles.itemContainer} key={index}>
                                                    <div className={styles.imageContainer}>
                                                        <Image className={styles.image} src={item.imageUrl!} alt="" width={200} height={200} unoptimized></Image>
                                                    </div>    
                                                    <div className={styles.description}>
                                                        <p className={styles.name}>{item.title}</p>
                                                        <div className={styles.priceContainer}>
                                                            {/* <p className={styles.price}>{type.p}$</p> */}
                                                            <button className={styles.editItem} onClick={() => handleEditNews(item)}>Edit</button>
                                                            <div className={styles.deleteBtn} onClick={() => removeMenu(item.id!)}>
                                                                <Image src="/images/delete.png" alt="" width={20} height={20} unoptimized></Image>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.serviceDes}>
                                                        {item.content}
                                                    </div>
                                                    <div className={styles.serviceDes}>
                                                        End Time: {formattedDate}
                                                    </div>
                                                    <div className={styles.discount}>
                                                        {item.percentDiscount}%
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
            { isShowPopup && <NewForm callback={closePopup} setIsDummy={setIsDummy} isDummy={isDummy} news={dealChange}/> }
        </div>
    );
}