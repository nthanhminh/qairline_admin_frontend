import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./styles.module.css"; // Path to your CSS file
import { ENewsType, News } from "@/ultis/type/deal.type";
import { uploadFile } from "@/ultis/apis/file.api";
import { createNews, editNews } from "@/ultis/apis/deal.api";
import { Airport } from "@/ultis/type/airport.type";
import { getAllAirports } from "@/ultis/apis/airport.api";

interface NewFormData {
  title: string;
  content: string;
  imageUrl: File | null; // Change to File type
  type: string;
  percentDiscount: number | null;
  cashDiscount: number | null;
  airportIds: string[];
  endTime: string;
}

interface FormErrors {
  [key: string]: string;
}

interface NewsFormProps {
  news: News | null;
  callback: Function;
  setIsDummy: Function;
  isDummy: boolean;
}

const NewForm: React.FC<NewsFormProps> = ({news, callback, setIsDummy, isDummy}) => {
  let initAirportIds = null;
  if(news) {
    initAirportIds = news.airports!.map(airport => airport.id!);
  }
  const [formData, setFormData] = useState<NewFormData>({
    title: news?.title ?? '',
    content:  news?.content ?? "",
    imageUrl: null, // Initialize as null since no file is selected initially
    type: news?.type ?? ENewsType.NEWS, // Default type is NEWS
    percentDiscount: news?.percentDiscount ?? null,
    cashDiscount: news?.cashDiscount ?? null,
    airportIds: initAirportIds ?? [],
    endTime: news?.endTime! ?? null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [airports, setAiports] = useState<Airport[]>([]);

  const airportOptions = ["Airport 1", "Airport 2", "Airport 3"]; // List of airports

  const fetchAirports = async () => {
    const data = await getAllAirports();
    const airportList = data.items;
    console.log(airportList);
    setAiports(airportList);
  }

  useEffect(() => {
    fetchAirports();
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

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
    } else if (type === "file") {
      // Handle file upload
      if (files && files[0]) {
        setFormData((prev) => ({ ...prev, imageUrl: files[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.content) newErrors.content = "Content is required.";
    if (!formData.type) newErrors.type = "Type is required.";
    if (formData.type === "NEWS" && formData.percentDiscount === 0 && formData.cashDiscount === 0) {
      newErrors.percentDiscount = "Either percentDiscount or cashDiscount must be greater than 0.";
    }
    // if (formData.airportIds.length === 0) newErrors.airportIds = "At least one airport must be selected.";
    // if (!formData.endTime) newErrors.endTime = "End time is required.";

    // Check if the image is selected when required (optional validation)
    // if (!formData.imageUrl && formData.type !== "NEWS") newErrors.imageUrl = "Image is required.";
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOverlayOnClick = () => {
    callback();
  };

  const handleContentOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan tới overlay
  };

  const createNewNews = async () => {
    let imageUrl = null;
    if(formData.imageUrl!) {
      imageUrl = await uploadFile(formData.imageUrl!);
    }
    console.log(formData.airportIds);
    const newService = await createNews({
      title: formData.title,
      content: formData.content,
      percentDiscount: formData.percentDiscount ?? 0,
      cashDiscount: formData.cashDiscount ?? 0,
      ...(imageUrl ? { imageUrl: imageUrl } : {}),
      type: formData.type as ENewsType,
      endTime: formData.endTime ? formatDate(formData.endTime) : null,
      airportIds: formData.airportIds ?? []
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newService);
  }

  const updateNews = async () => {
    let imageUrl = null;
    if(formData.imageUrl!) {
      imageUrl = await uploadFile(formData.imageUrl!);
    }
    const newNews = await editNews(news!.id!, {
      title: formData.title,
      content: formData.content,
      percentDiscount: formData.percentDiscount ?? 0,
      cashDiscount: formData.cashDiscount ?? 0,
      ...(imageUrl ? { imageUrl: imageUrl } : {}),
      type: formData.type as ENewsType,
      endTime: formData.endTime ? formatDate(formData.endTime) : null,
      airportIds: formData.airportIds || []
    })
    setIsDummy(!isDummy);
    callback();
    console.log(newNews);
  }

  function formatDate(inputDate: any): string {
    const date = new Date(inputDate);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if(news) {
        updateNews();
      } else {
        createNewNews();
      }
      console.log("Hello");
      // You can handle the image file upload logic here, like sending it to the server
    }
    console.log("testing");
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayOnClick}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent} onClick={handleContentOnClick}>
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

          {/* File Upload for Image URL */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="imageUrl">Image</label>
            <input
              className={styles.input}
              type="file"
              name="imageUrl"
              id="imageUrl"
              onChange={handleChange}
            />
            {errors.imageUrl && <p className={styles.error}>{errors.imageUrl}</p>}
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
              <option value="NEWS">NEWS</option>
              <option value="DISCOUNT">DISCOUNT</option>
            </select>
            {errors.type && <p className={styles.error}>{errors.type}</p>}
          </div>

          {formData.type !== "NEWS" && (
            <div className={styles.itemContainer}>
              <label className={styles.label}>Airports</label>
              <div className={styles.checkboxGroup}>
                {airports.map((airport,index) => (
                  <label key={index} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="airportIds"
                      value={airport.id!}
                      checked={formData.airportIds.includes(airport.id!)}
                      onChange={handleChange}
                    />
                    {`${airport.name} - ${airport.code}`}
                  </label>
                ))}
              </div>
              {errors.airportIds && <p className={styles.error}>{errors.airportIds}</p>}
            </div>
          )}

          {/* Other Fields for Percent Discount, Cash Discount, and End Time */}
          {formData.type !== "NEWS" && (
            <>
              <div className={styles.itemContainer}>
                <label className={styles.label} htmlFor="percentDiscount">Percent Discount</label>
                <input
                  className={styles.input}
                  type="number"
                  name="percentDiscount"
                  id="percentDiscount"
                  placeholder="0"
                  value={formData.percentDiscount ?? 0}
                  onChange={handleChange}
                />
                {errors.percentDiscount && <p className={styles.error}>{errors.percentDiscount}</p>}
              </div>

              <div className={styles.itemContainer}>
                <label className={styles.label} htmlFor="cashDiscount">Cash Discount</label>
                <input
                  className={styles.input}
                  type="number"
                  name="cashDiscount"
                  id="cashDiscount"
                  placeholder="0"
                  value={formData.cashDiscount ?? 0}
                  onChange={handleChange}
                />
                {errors.cashDiscount && <p className={styles.error}>{errors.cashDiscount}</p>}
              </div>

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
            </>
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
