'use client';

import { FC, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { changePassword } from "@/ultis/apis/auth.api";
import { useRouter } from "next/navigation";

export interface ChangePasswordPageProps {
    translate: any;
}

export const ChangePasswordPage: FC<ChangePasswordPageProps> = ({
    translate,
}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleUpdatePasswordApi = async () => {
        try {
            await changePassword({
                oldPassword,
                password: newPassword,
            });
            router.push('dashboard');
        } catch (error) {
            console.error("Error updating password:", error);
            // setError("Failed to update password. Please try again.");
        }
    };

    const handleSubmit = () => {
        // Validate old password
        if (!oldPassword) {
            setError("Old password is required.");
            return;
        }

        // Validate new password length
        if (newPassword.length < 6 || newPassword.length > 14) {
            setError("New password must be between 6 and 14 characters.");
            return;
        }

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Clear error and process submission
        setError("");
        console.log("Password change submitted successfully.");
        handleUpdatePasswordApi();
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image src='/images/airplane.png' width={48} height={48} unoptimized alt="Logo" />
                </div>
                <h3 className={styles.title}>
                    Q Airline Admin
                </h3>
                <div className={styles.content}>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Old password"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                        />
                    </div>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                    </div>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <button className={styles.btn} onClick={handleSubmit}>
                        Change password
                    </button>
                </div>
            </div>
        </div>
    );
};
