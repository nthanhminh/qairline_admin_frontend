'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import MenuForm from "../edit/menu/editMenu.page";
import NewForm from "../edit/news/editNews.page";
export interface DealPageProps {
    translate: any
}
  
export const DealPage: FC<DealPageProps> = ({
    translate
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Service</h2>
                <button className={styles.addItem}>Add Item</button>
            </div>
            <div className={styles.typeContainer}>
                <h3>News</h3>
                <div className={styles.listContainer}>
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <div className={styles.priceContainer}>
                                <p className={styles.price}>350$</p>
                                <button className={styles.editItem}>Edit</button>
                            </div>
                        </div>
                        <div className={styles.serviceDes}>
                            This is a service for car renting.
                        </div>
                        <div className={styles.discount}>
                            10%
                        </div>
                    </div>    
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                </div> 
            </div>
            <div className={styles.typeContainer}>
                <h3>Discount</h3>
                <div className={styles.listContainer}>
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <div className={styles.priceContainer}>
                                <p className={styles.price}>350$</p>
                                <button className={styles.editItem}>Edit</button>
                            </div>
                        </div>
                        <div className={styles.serviceDes}>
                            This is a service for car renting.
                        </div>
                    </div>    
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                    <div className={styles.itemContainer}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} src="/images/pizza.jpg" alt="" width={200} height={200} unoptimized></Image>
                        </div>    
                        <div className={styles.description}>
                            <p className={styles.name}>Pizza</p>
                            <p className={styles.price}>350$</p>
                        </div>
                    </div> 
                </div> 
            </div>
            {/* <MenuForm></MenuForm> */}
            {/* <NewForm /> */}
        </div>
    );
}