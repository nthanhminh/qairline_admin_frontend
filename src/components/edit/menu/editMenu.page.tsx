import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./styles.module.css";
import { EMenuType, Menu } from "@/ultis/type/menu.type";
import { uploadFile } from "@/ultis/apis/file.api";
import { createMenu, editMenu } from "@/ultis/apis/menu.api";

interface FormData {
  name: string;
  description: string;
  thumbnail?: File | null;
  price: number;
  type: EMenuType;
}

interface FormErrors {
  [key: string]: string;
}

interface MenuFormProps {
  menu: Menu | null;
  callback: Function;
  setIsDummy: Function;
  isDummy: boolean;
}

const MenuForm: React.FC<MenuFormProps> = ({menu, callback, setIsDummy, isDummy}) => {
  const [formData, setFormData] = useState<FormData>({
    name: menu?.name ?? '',
    description: menu?.description ?? '',
    thumbnail: null,
    price: menu?.price ?? 0,
    type: menu?.type as EMenuType.FOOD ?? EMenuType.FOOD,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if(menu) {
        updateMenu();
      } else {
        createNewMenu();
      }
      console.log("Form data submitted:", formData);
    }
  };

  const handleOverlayOnClick = () => {
    callback();
  };

  const handleContentOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); 
  };

  const createNewMenu = async () => {
    console.log(formData.thumbnail!);
    let imageUrl = null;
    if(formData.thumbnail!) {
      imageUrl = await uploadFile(formData.thumbnail!);
    }
    console.log(imageUrl);
    const newMenu = await createMenu({
      name: formData.name,
      ...(imageUrl ? { thumbnail: imageUrl } : {}),
      // thumbnail: 'https://www.wikihow.com/images/thumb/4/4f/Take-Care-of-Your-Pet-Step-7-Version-4.jpg/v4-460px-Take-Care-of-Your-Pet-Step-7-Version-4.jpg',
      description: formData.description,
      type: formData.type as EMenuType,
      price: formData.price
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newMenu);
  }

  const updateMenu = async () => {
    console.log(formData.thumbnail!);
    let imageUrl = null;
    if(formData.thumbnail!) {
      imageUrl = await uploadFile(formData.thumbnail!);
    }
    const newMenu = await editMenu(menu!.id!, {
      name: formData.name,
      thumbnail: imageUrl ?? menu!.thumbnail! ,
      // thumbnail: 'https://www.wikihow.com/images/thumb/4/4f/Take-Care-of-Your-Pet-Step-7-Version-4.jpg/v4-460px-Take-Care-of-Your-Pet-Step-7-Version-4.jpg',
      description: formData.description,
      type: formData.type as EMenuType,
      price: formData.price
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newMenu);
  }

  return (
    <div className={styles.overlay} onClick={() => handleOverlayOnClick()}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent} onClick={handleContentOnClick}>
          <h3 style={{ textAlign: "center", width: "100%" }}>Menu</h3>
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
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="thumbnail">Thumbnail</label>
            <input
              className={styles.input}
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={handleChange}
            />
          </div>
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
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="type">Type</label>
            <select
              className={styles.input}
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value={EMenuType.FOOD}>{EMenuType.FOOD}</option>
              <option value={EMenuType.DRINK}>{EMenuType.DRINK}</option>
            </select>
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
