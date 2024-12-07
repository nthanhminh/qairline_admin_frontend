import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn

interface ServiceFormData {
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  price: number;
}

interface FormErrors {
  [key: string]: string;
}

const ServiceForm: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    imageUrl: "",
    description: "",
    type: "",
    price: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const serviceTypes = ["Type 1", "Type 2", "Type 3"]; // Danh sách các giá trị dropdown

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Clear the error for the specific field when its value changes
    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.type) newErrors.type = "Type is required.";
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
          <h3 style={{ textAlign: "center", width: "100%" }}>Service</h3>

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
              <option value="" disabled>Select type</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className={styles.error}>{errors.type}</p>}
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

export default ServiceForm;
