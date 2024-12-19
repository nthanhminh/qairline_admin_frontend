"use client";

import { FC, useEffect, useRef, useState } from "react";
// import { NavBarTranslation } from "./navBar.translation";
import styles from "./styles.module.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
export interface NavBarPageProps {
    translate: any;
}

export const NavBarPage: FC<NavBarPageProps> = ({ translate }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const router = useRouter();
    const pathName = usePathname();
    const locale = useLocale();
    useEffect(() => {
        switch (pathName) {
            case `/${locale}/dashboard`:
                setSelectedIndex(0);
                break;
            case `/${locale}/bookings`:
                setSelectedIndex(1);
                break;
            case `/${locale}/flights`:
                setSelectedIndex(2);
                break;
            case `/${locale}/services`:
                setSelectedIndex(3);
                break;
            case `/${locale}/menus`:
                setSelectedIndex(4);
                break;
            case `/${locale}/aircrafts`:
                setSelectedIndex(5);
                break;
            case `/${locale}/deals`:
                setSelectedIndex(6);
                break;
        }
    }, [pathName]);

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
                            router.push(`/${locale}/dashboard`);
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
                            router.push(`/${locale}/bookings`);
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
                            router.push(`/${locale}/flights`);
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
                            router.push(`/${locale}/services`);
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
                            router.push(`/${locale}/menus`);
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
                            router.push(`/${locale}/aircrafts`);
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
                            router.push(`/${locale}/deals`);
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
