'use client';

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/ultis/apis/auth.api";
export interface MenuPageProps {
    translate: any
}
  
export const UserPage: FC<MenuPageProps> = ({
    translate
}) => {
    const router = useRouter();
    const handleLogoutApi = async() => {
        await logout();
        router.push('login');
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.imageContainer}>
                        <Image src='/images/airplane.png' alt="" width={32} height={32}></Image>
                    </div>
                    <div className={styles.name}>
                        Admin
                    </div>
                    <div className={styles.optionContainer}>
                        <div className={styles.optionItem} onClick={() => {
                            router.push('changePassword')
                        }}>
                            Change Password
                        </div>
                        <div className={styles.optionItem} onClick={() => {
                            handleLogoutApi();
                        }}>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}