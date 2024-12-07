'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import MenuForm from "../edit/menu/editMenu.page";
export interface MenuPageProps {
    translate: any
}
  
export const MenuPage: FC<MenuPageProps> = ({
    translate
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Menu</h2>
                <button className={styles.addItem}>Add Item</button>
            </div>
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
            {/* <MenuForm></MenuForm> */}
        </div>
    );
}