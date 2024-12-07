import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn

interface FormData {
  name: string;
  description: string;
  thumbnail: File | null;
  price: number;
}

interface FormErrors {
  [key: string]: string;
}

const MenuForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    thumbnail: null,
    price: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear the error for the specific field when its value changes
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "thumbnail") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, thumbnail: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";

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
          <h3 style={{ textAlign: "center", width: "100%" }}>Menu</h3>

          {/* Input Name */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
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

          {/* Input Thumbnail */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="thumbnail">Thumbnail</label>
            <input
              className={styles.input}
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={handleChange}
            />
            {errors.thumbnail && <p className={styles.error}>{errors.thumbnail}</p>}
          </div>

          {/* Input Price */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="price">Price</label>
            <input
              className={styles.input}
              type="number"
              name="price"
              id="price"
              placeholder="0"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className={styles.error}>{errors.price}</p>}
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

export default MenuForm;
