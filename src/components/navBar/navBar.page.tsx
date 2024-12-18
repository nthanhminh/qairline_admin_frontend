"use client";

import { FC, useEffect, useRef, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
export interface NavBarPageProps {
    translate: any;
}

export const NavBarPage: FC<NavBarPageProps> = ({ translate }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const router = useRouter();
    const locale = useLocale();
    useEffect(() => {
        switch (selectedIndex) {
            case 0:
                router.push(`/${locale}/dashboard`);
                break;
            case 1:
                router.push(`/${locale}/bookings`);
                break;
            case 2:
                router.push(`/${locale}/flights`);
                break;
            case 3:
                router.push(`/${locale}/services`);
                break;
            case 4:
                router.push(`/${locale}/menus`);
                break;
            case 5:
                router.push(`/${locale}/aircrafts`);
                break;
            case 6:
                router.push(`/${locale}/deals`);
                break;
        }
    }, [selectedIndex]);

    const updateSelectedIndex = (index: number) => {
        setSelectedIndex(index);
    };

    const navbarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const handleOpenNav = () => {
        navbarRef.current?.classList.toggle(styles.open);
        overlayRef.current?.classList.toggle(styles.open);
    };
    return (
        <>
            <div
                className={styles.openNavButton}
                onClick={() => {
                    handleOpenNav();
                }}
            >
                <Image
                    className={styles.openNavIcon}
                    src="/images/icons/menu.png"
                    width={24}
                    height={24}
                    alt=""
                />
            </div>
            <div
                className={styles.openNavOverlay}
                onClick={() => handleOpenNav()}
                ref={overlayRef}
            ></div>
            <div className={styles.navBarContainer} ref={navbarRef}>
                <div className={styles.closeNavButton} onClick={handleOpenNav}>
                    <Image
                        className={styles.openNavIcon}
                        src="/images/icons/close.png"
                        width={24}
                        height={24}
                        alt=""
                    />
                </div>
                <div className={styles.logoContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/airplane.png"
                            width={36}
                            height={36}
                            unoptimized
                            alt="Logo"
                        ></Image>
                    </div>
                    <div className={styles.branchName}>QAirline</div>
                </div>
                <div className={styles.listContainer}>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 0 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(0);
                        }}
                    >
                        <Image
                            src="/images/icons/dashboard.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Dashboard</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 1 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(1);
                        }}
                    >
                        <Image
                            src="/images/icons/appointment.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Bookings</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 2 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(2);
                        }}
                    >
                        <Image
                            src="/images/icons/departures.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Flights</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 3 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(3);
                        }}
                    >
                        <Image
                            src="/images/icons/service.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Services</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 4 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(4);
                        }}
                    >
                        <Image
                            src="/images/icons/restaurant.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Menus</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 5 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(5);
                        }}
                    >
                        <Image
                            src="/images/icons/airplane.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Aircrafts</div>
                    </div>
                    <div
                        className={`${styles.itemContainer} ${
                            selectedIndex === 6 ? styles.navBarSelected : ""
                        }`}
                        onClick={() => {
                            updateSelectedIndex(6);
                        }}
                    >
                        <Image
                            src="/images/icons/deal.png"
                            width={14}
                            height={14}
                            alt="Dashboard"
                            unoptimized
                        ></Image>
                        <div className={styles.itemName}>Deals</div>
                    </div>
                </div>
            </div>
        </>
    );
};
