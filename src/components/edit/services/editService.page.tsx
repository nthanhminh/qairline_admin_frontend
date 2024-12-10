import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css"; // Đường dẫn file CSS của bạn
import { EServiceType, Service } from "@/ultis/type/service.type";
import { uploadFile } from "@/ultis/apis/file.api";
import { createService, editService } from "@/ultis/apis/service.api";

interface ServiceFormData {
  name: string;
  imageUrl: File | null; // Định nghĩa imageUrl là File hoặc null
  description: string;
  type: string;
  price: number;
}

interface FormErrors {
  [key: string]: string;
}

interface ServiceFormProps {
  service: Service | null;
  callback: Function;
  setIsDummy: Function;
  isDummy: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, callback, isDummy, setIsDummy }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: service?.name ?? "",
    imageUrl: null,
    description: service?.description ?? "",
    type: service?.type ?? "",
    price: service?.price ?? 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const serviceTypes = Object.values(EServiceType);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setErrors((prev) => ({ ...prev, [name]: "" })); // Xóa lỗi khi thay đổi giá trị

    if (name === "imageUrl" && files) {
      console.log(files);
      // Nếu là input file, lấy file đầu tiên
      setFormData((prev) => ({ ...prev, imageUrl: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOverlayOnClick = () => {
    callback();
  };

  const handleContentOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan tới overlay
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.imageUrl) newErrors.imageUrl = "Image is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createNewService = async () => {
    const imageUrl = await uploadFile(formData.imageUrl!);
    const newService = await createService({
      name: formData.name,
      // imageUrl: imageUrl,
      imageUrl: 'https://www.wikihow.com/images/thumb/4/4f/Take-Care-of-Your-Pet-Step-7-Version-4.jpg/v4-460px-Take-Care-of-Your-Pet-Step-7-Version-4.jpg',
      description: formData.description,
      type: formData.type as EServiceType,
      price: formData.price
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newService);
  }

  const updateService = async () => {
    const imageUrl = await uploadFile(formData.imageUrl!);
    const newService = await editService(service!.id!, {
      name: formData.name,
      // imageUrl: imageUrl,
      imageUrl: 'https://www.wikihow.com/images/thumb/4/4f/Take-Care-of-Your-Pet-Step-7-Version-4.jpg/v4-460px-Take-Care-of-Your-Pet-Step-7-Version-4.jpg',
      description: formData.description,
      type: formData.type as EServiceType,
      price: formData.price
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newService);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if(service) {
        updateService()
      } else {
        createNewService();
      }
      console.log(formData);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayOnClick}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent} onClick={handleContentOnClick}>
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

          {/* Input Image */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="imageUrl">Image</label>
            <input
              className={styles.input}
              type="file" // Thay đổi từ text thành file
              name="imageUrl"
              id="imageUrl"
              onChange={handleChange} // Gọi handleChange khi file thay đổi
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
