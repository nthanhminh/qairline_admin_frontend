'use client'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";  // Import file styles.module.css

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonthYear, setCurrentMonthYear] = useState<Date>(new Date());

    return (
            <div className={styles.dateContainer}>
                <label htmlFor="date">Departure Time</label>
                <DatePicker
                    name="date"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    showPopperArrow={false}
                    className={styles.customInput}  // Lớp CSS cho input
                    calendarClassName={styles.customCalendar}  // Lớp CSS cho calendar
                    popperPlacement="bottom"
                    onMonthChange={(monthDate) => setCurrentMonthYear(monthDate)}
                    renderDayContents={(day, date) => {
                        // Kiểm tra nếu ngày không thuộc tháng hiện tại của DatePicker
                        if (date.getMonth() !== currentMonthYear.getMonth() || date.getFullYear() !== currentMonthYear.getFullYear()) {
                            return null; // Không hiển thị ngày
                        }
                        return day; // Hiển thị ngày bình thường
                    }}
                    dayClassName={(date) => {
                        if (date.getMonth() !== currentMonthYear.getMonth()) {
                            return styles.customDayOutsideMonth; // Lớp cho các ngày trong tháng trước
                        }
                        if (date.toDateString() === new Date().toDateString()) {
                            return styles.customDayToday; // Lớp cho ngày hôm nay
                        }
                        return ""; // Lớp mặc định
                    }}
                />
            </div> 
    );
};

export default CustomDatePicker;
