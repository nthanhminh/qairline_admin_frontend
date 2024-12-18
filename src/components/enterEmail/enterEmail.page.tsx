'use client';

import { FC, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sendCode } from "@/ultis/apis/auth.api";

export interface EnterEmailPageProps {
    translate: any;
}

export const EnterEmailPage: FC<EnterEmailPageProps> = ({
    translate,
}) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Xác thực email bằng regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(value);

        if (emailRegex.test(value)) {
            setError("");
        } else {
            setError("Please enter a valid email address.");
        }
    };

    const handleVerifyEmailApi = async () => {
        try {
            await sendCode(email);
            router.push(`verify?email=${email}`);   
        } catch (error) {
            console.log(error);
        }
    };

    const handleVerify = () => {
        // Kiểm tra email trước khi gửi
        if (!email) {
            setError("Email is required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        handleVerifyEmailApi();
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image src='/images/airplane.png' width={48} height={48} unoptimized alt="Logo"></Image>
                </div>
                <h3 className={styles.title}>
                    Please enter your email address to continue.
                </h3>
                <div className={styles.item}>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                <button className={styles.btn} onClick={handleVerify}>
                    Enter
                </button>
            </div>
        </div>
    );
};
