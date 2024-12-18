'use client';

import { FC, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { forgotPassword } from "@/ultis/apis/auth.api";
import { useRouter } from "next/navigation";

export interface ForgotPageProps {
    translate: any;
    code: number;
    email: string;
}

export const ForgotPage: FC<ForgotPageProps> = ({
    translate,
    code,
    email
}) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length >= 6 && value.length <= 14) {
            setPassword(value);
            setError(""); 
        } else {
            setPassword(value);
            setError("Password must be between 6 and 14 characters.");
        }
    };

    const handleForgotPasswordApi = async () => {
        try {
            await forgotPassword({
                password: password,
                code: code,
                email: email
            })
            router.push('login');
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdatePassword = () => {
        if (password.length < 6 || password.length > 14) {
            setError("Password must be between 6 and 14 characters.");
            return;
        }

        // Logic cập nhật mật khẩu ở đây
        handleForgotPasswordApi();
        console.log("Updating password:", password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image src='/images/airplane.png' width={48} height={48} unoptimized alt="Logo"></Image>
                </div>
                <h3 className={styles.title}>
                    Q Airline Admin
                </h3>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        {error && <div className={styles.error}>{error}</div>}
                    </div>
                    <button className={styles.btn} onClick={handleUpdatePassword}>
                        Update password
                    </button>
                </div>
            </div>
        </div>
    );
};
