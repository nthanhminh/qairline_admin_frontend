import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css";
import { EPlaneType, Plane } from "@/ultis/type/plane.type";
import { createPlane, editPlane } from "@/ultis/apis/plane.api";

interface FormData {
  name: string;
  type: string;
  description: string;
}

interface FormErrors {
  [key: string]: string;
}

interface AircraftFormProps {
  plane: Plane | null;
  callback: Function;
  setIsDummy: Function;
  isDummy: boolean;
}

const AircraftForm: React.FC<AircraftFormProps> = ({plane, callback, setIsDummy, isDummy}) => {
  const [formData, setFormData] = useState<FormData>({
    name: plane!.name ?? '',
    type: plane!.type ?? EPlaneType.A310,
    description: plane!.description ?? '',
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
      if(plane) {
        updatePlane()
      } else {
        createNewPlane();
      }
    }
  };

  const handleOverlayOnClick = () => {
    callback();
  };

  const handleContentOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan tới overlay
  };

  const createNewPlane = async () => {
    const newService = await createPlane({
      name: formData.name,
      type: formData.type as EPlaneType,
      description: formData.description,
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newService);
  }

  const updatePlane = async () => {
    const newService = await editPlane(plane!.id!, {
      name: formData.name,
      type: formData.type as EPlaneType,
      description: formData.description,
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newService);
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayOnClick}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent} onClick={handleContentOnClick}>
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
              {Object.values(EPlaneType).map((planeType) => (
                <option key={planeType} value={planeType}>
                  {planeType} 
                </option>
              ))}
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
