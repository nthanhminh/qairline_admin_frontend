'use client';

import { FC, useState } from "react";
import styles from "./styles.module.css"
import Image from "next/image";
import { verifyCode } from "@/ultis/apis/auth.api";
import { useRouter } from "next/navigation";

export interface VerifyPageProps {
    translate: any,
    email: string;
}
  
export const VerifyPage: FC<VerifyPageProps> = ({
    translate,
    email
}) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setCode(value);
            setError(""); 
        } else {
            setError("Code must be a 6-digit number.");
        }
    };

    const handleVerifyCodeApi = async () => {
        try {
            await verifyCode({
                code: code,
                email: email
            })
            router.push(`forgotPassword?code=${code}&email=${email}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleVerify = () => {
        if (code.length !== 6) {
            setError("Code must be exactly 6 digits.");
            return;
        }
        handleVerifyCodeApi();
        console.log("Verifying code:", code);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image src='/images/airplane.png' width={48} height={48} unoptimized alt="Logo"></Image>
                </div>
                <h3 className={styles.title}>
                    Please enter your code which was sent to you via your email address.
                </h3>
                <div className={styles.item}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={handleInputChange}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                <button className={styles.btn} onClick={handleVerify}>
                    Verify
                </button>
            </div>
        </div>
    );
};
