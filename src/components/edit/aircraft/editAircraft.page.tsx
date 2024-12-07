import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn

interface FormData {
  name: string;
  type: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

const AircraftForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Clear error for the specific field when its value changes
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (!formData.description) newErrors.description = "Description is required.";

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
          <h3 style={{ textAlign: "center", width: "100%" }}>Aircraft</h3>

          {/* Input Name */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Aircraft Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          {/* Input Type (Select) */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="type">Type</label>
            <select
              className={styles.input}
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="commercial">Commercial</option>
              <option value="private">Private</option>
              <option value="military">Military</option>
            </select>
            {errors.type && <p className={styles.error}>{errors.type}</p>}
          </div>

          {/* Input Description */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="description">Description</label>
            <textarea
              className={styles.input}
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className={styles.error}>{errors.description}</p>}
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

export default AircraftForm;
