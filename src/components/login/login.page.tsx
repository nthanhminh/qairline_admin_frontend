'use client';

import { FC } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
export interface MenuPageProps {
    translate: any
}
  
export const LoginPage: FC<MenuPageProps> = ({
    translate
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h3 className={styles.title}>
                    Q Airline Admin
                </h3>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <input className={styles.input} type="text" placeholder="name"/>
                        <div className={styles.error}></div>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="email" placeholder="email"/>
                        <div className={styles.error}></div>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="password" placeholder="password"/>
                        <div className={styles.error}></div>
                    </div>
                    <div className={styles.forgotPassword}>
                        Forgot password?
                    </div>
                    <button className={styles.btn}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}