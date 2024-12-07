import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn

interface FormData {
  name: string;
  code: string;
  departureTime: string;
  duration: string;
  plane: string;
  windowPrice: string;
  aislePrice: string;
  exitSeat: string;
  businessPrice: string;
  premiumEconomy: string;
  economy: string;
  basicEconomy: string;
}

interface FormErrors {
  [key: string]: string;
}

const FlightForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    code: "",
    departureTime: "",
    duration: "",
    plane: "",
    windowPrice: "",
    aislePrice: "",
    exitSeat: "",
    businessPrice: "",
    premiumEconomy: "",
    economy: "",
    basicEconomy: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Clear the error for the specific field when its value changes
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.code) newErrors.code = "Flight code is required.";
    if (!/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/.test(formData.departureTime))
      newErrors.departureTime = "Invalid departure time format (dd-mm-yyyy hh:mm:ss).";
    if (!/^\d{2}:\d{2}:\d{2}$/.test(formData.duration))
      newErrors.duration = "Invalid duration format (hh:mm:ss).";
    if (!formData.plane) newErrors.plane = "Please select an aircraft.";

    [
      "windowPrice",
      "aislePrice",
      "exitSeat",
      "businessPrice",
      "premiumEconomy",
      "economy",
      "basicEconomy",
    ].forEach((field) => {
      if (formData[field as keyof FormData] === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
      } else if (
        isNaN(Number(formData[field as keyof FormData])) ||
        Number(formData[field as keyof FormData]) < 0
      ) {
        newErrors[field] = `invalid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent}>
          <h3 style={{ textAlign: "center", width: "100%" }}>Flight</h3>

          {/* Input Name */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          {/* Input Code */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="code">Flight Code</label>
            <input
              className={styles.input}
              type="text"
              name="code"
              id="code"
              placeholder="code"
              value={formData.code}
              onChange={handleChange}
            />
            {errors.code && <p className={styles.error}>{errors.code}</p>}
          </div>

          {/* Input Departure Time */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="departureTime">Departure Time</label>
            <input
              className={styles.input}
              type="text"
              name="departureTime"
              id="departureTime"
              placeholder="dd-mm-yyyy hh:mm:ss"
              value={formData.departureTime}
              onChange={handleChange}
            />
            {errors.departureTime && <p className={styles.error}>{errors.departureTime}</p>}
          </div>

          {/* Input Duration */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="duration">Duration</label>
            <input
              className={styles.input}
              type="text"
              name="duration"
              id="duration"
              placeholder="hh:mm:ss"
              value={formData.duration}
              onChange={handleChange}
            />
            {errors.duration && <p className={styles.error}>{errors.duration}</p>}
          </div>

          {/* Select Aircraft */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="plane">Aircraft</label>
            <select
              className={`${styles.input} ${styles.select}`}
              name="plane"
              id="plane"
              value={formData.plane}
              onChange={handleChange}
            >
              <option value="">Select an aircraft</option>
              <option value="boeing737">Boeing 737</option>
              <option value="airbusA320">Airbus A320</option>
              <option value="cessna172">Cessna 172</option>
              <option value="gulfstreamG650">Gulfstream G650</option>
            </select>
            {errors.plane && <p className={styles.error}>{errors.plane}</p>}
          </div>

          {/* Các trường giá */}
          <div className={styles.rowAddContainer}>
            {["windowPrice", "aislePrice", "exitSeat"].map((field) => (
              <div key={field} className={styles.itemContainer}>
                <label className={styles.label} htmlFor={field}>
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name={field}
                  id={field}
                  placeholder="0"
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                />
                {errors[field] && <p className={styles.error}>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div className={styles.rowAddContainer}>
            {["businessPrice", "premiumEconomy", "economy", "basicEconomy"].map((field) => (
              <div key={field} className={styles.itemContainer}>
                <label className={styles.label} htmlFor={field}>
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name={field}
                  id={field}
                  placeholder="0"
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                />
                {errors[field] && <p className={styles.error}>{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightForm;
