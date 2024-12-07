import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn

interface NewFormData {
  title: string;
  content: string;
  imageUrl: string;
  type: string;
  percentDiscount: number;
  cashDiscount: number;
  airportIds: string[];
  endTime: string;
}

interface FormErrors {
  [key: string]: string;
}

const NewForm: React.FC = () => {
  const [formData, setFormData] = useState<NewFormData>({
    title: "",
    content: "",
    imageUrl: "",
    type: "NEWS", // Default type is NEWS
    percentDiscount: 0,
    cashDiscount: 0,
    airportIds: [],
    endTime: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const airportOptions = ["Airport 1", "Airport 2", "Airport 3"]; // Danh sách các sân bay

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // Clear the error for the specific field when its value changes
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (type === "checkbox") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          airportIds: [...prev.airportIds, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          airportIds: prev.airportIds.filter((airport) => airport !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.content) newErrors.content = "Content is required.";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (formData.type === "NEWS" && formData.percentDiscount === 0 && formData.cashDiscount === 0) {
      newErrors.percentDiscount = "Either percentDiscount or cashDiscount must be greater than 0.";
    }
    if (formData.airportIds.length === 0) newErrors.airportIds = "At least one airport must be selected.";
    if (!formData.endTime) newErrors.endTime = "End time is required.";

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
          <h3 style={{ textAlign: "center", width: "100%" }}>New Form</h3>

          {/* Input Title */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="title">Title</label>
            <input
              className={styles.input}
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>

          {/* Input Content */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="content">Content</label>
            <textarea
              className={styles.input}
              name="content"
              id="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
            />
            {errors.content && <p className={styles.error}>{errors.content}</p>}
          </div>

          {/* Input Image URL */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="imageUrl">Image URL</label>
            <input
              className={styles.input}
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            {errors.imageUrl && <p className={styles.error}>{errors.imageUrl}</p>}
          </div>

          {/* Select Type */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="type">Type</label>
            <select
              className={styles.input}
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="NEWS">NEWS</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.type && <p className={styles.error}>{errors.type}</p>}
          </div>

          {/* Checkbox for Airports */}
          {formData.type !== "NEWS" && (
            <div className={styles.itemContainer}>
              <label className={styles.label}>Airports</label>
              <div className={styles.checkboxGroup}>
                {airportOptions.map((airport) => (
                  <label key={airport} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="airportIds"
                      value={airport}
                      checked={formData.airportIds.includes(airport)}
                      onChange={handleChange}
                    />
                    {airport}
                  </label>
                ))}
              </div>
              {errors.airportIds && <p className={styles.error}>{errors.airportIds}</p>}
            </div>
          )}

          {/* Input Percent Discount */}
          {formData.type !== "NEWS" && (
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="percentDiscount">Percent Discount</label>
              <input
                className={styles.input}
                type="number"
                name="percentDiscount"
                id="percentDiscount"
                placeholder="0"
                value={formData.percentDiscount}
                onChange={handleChange}
              />
              {errors.percentDiscount && <p className={styles.error}>{errors.percentDiscount}</p>}
            </div>
          )}

          {/* Input Cash Discount */}
          {formData.type !== "NEWS" && (
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="cashDiscount">Cash Discount</label>
              <input
                className={styles.input}
                type="number"
                name="cashDiscount"
                id="cashDiscount"
                placeholder="0"
                value={formData.cashDiscount}
                onChange={handleChange}
              />
              {errors.cashDiscount && <p className={styles.error}>{errors.cashDiscount}</p>}
            </div>
          )}

          {/* Input End Time */}
          {formData.type !== "NEWS" && (
            <div className={styles.itemContainer}>
              <label className={styles.label} htmlFor="endTime">End Time</label>
              <input
                className={styles.input}
                type="datetime-local"
                name="endTime"
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {errors.endTime && <p className={styles.error}>{errors.endTime}</p>}
            </div>
          )}

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

export default NewForm;
