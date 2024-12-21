"use client";

import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { login } from "@/ultis/apis/auth.api";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useGlobalContext } from "@/contexts/global.context";
import { LoadingBtn } from "../loading/loadingForButton/loadingBtn";
import { EEnvironmentLogin } from "@/ultis/type/commom.type";

export interface MenuPageProps {
    translate: any;
}

export const LoginPage: FC<MenuPageProps> = ({ translate }) => {
    const router = useRouter();
    const lng = useLocale();
    const { handleShowMessage } = useGlobalContext();
    const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
    const signIn = async () => {
        try {
            setIsBtnLoading(true);
            await login({
                email: formData.email,
                password: formData.password,
                environment: EEnvironmentLogin.APP_ADMIN
            });
            handleShowMessage(1, "Login successfully");
            setIsBtnLoading(false);
            setTimeout(() => {
                router.push(`dashboard`);
            }, 3000);
        } catch (error) {
            setIsBtnLoading(false);
            handleShowMessage(2, "Login failed");
        }
    };

    const handleForgotPassword = () => {
        router.push("enterEmail");
    };
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error for the current field
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: "",
        };

        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            signIn();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/images/airplane.png"
                        width={48}
                        height={48}
                        unoptimized
                        alt="Logo"
                    />
                </div>
                <h3 className={styles.title}>Q Airline Admin</h3>
                <form className={styles.content} onSubmit={handleSubmit}>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <div className={styles.error}>{errors.email}</div>
                        )}
                    </div>
                    <div className={styles.item}>
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && (
                            <div className={styles.error}>
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div
                        className={styles.forgotPassword}
                        onClick={() => {
                            handleForgotPassword();
                        }}
                    >
                        Forgot password?
                    </div>
                    <div className={styles.btnContainer}>
                        {!isBtnLoading ? (
                            <button type="submit" className={styles.btn}>
                                Sign In
                            </button>
                        ) : (
                            <LoadingBtn />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
