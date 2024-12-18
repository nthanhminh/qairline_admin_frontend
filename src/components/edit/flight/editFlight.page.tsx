import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./styles.module.css"; // Make sure the path to your CSS file is correct
import { ESeatClass, Flight, FlightPrice, Plane } from "@/ultis/type/flight.type";
import { DataGroupByType } from "@/ultis/type/commom.type";
import { Airport } from "@/ultis/type/airport.type";
import { getAllAirport } from "@/ultis/apis/airport.api";
import { createFlight, UpdateFlightAndPrice } from "@/ultis/apis/flight.api";
import { getAllPlane } from "@/ultis/apis/plane.api";
import moment from 'moment-timezone';
import { useGlobalContext } from "@/contexts/global.context";

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
  fromAirport: string;
  toAirport: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FlightFormProps {
  flight: Flight | null;
  callback: Function;
  setIsDummy: Function;
  isDummy: boolean;
  groupBySeatClassData: Record<string, FlightPrice[]> | null;
}

const FlightForm: React.FC<FlightFormProps> = ({ flight, callback, setIsDummy, isDummy, groupBySeatClassData }) => {
  const formattedData = moment(flight?.departureTime!)
    .tz('Asia/Ho_Chi_Minh')
    .format('DD-MM-YYYY HH:mm:ss');
  const [formData, setFormData] = useState<FormData>({
    name: flight?.name || '',
    code: flight?.flightCode || '',
    departureTime: formattedData ?? '',
    duration: flight?.duration?.toString() ?? '',
    plane: flight?.plane?.id ?? '',
    windowPrice: flight?.window_seat_price.toString() ?? '',
    aislePrice: flight?.aisle_seat_price.toString() ?? '',
    exitSeat: flight?.exit_row_seat_price.toString() ?? '',
    businessPrice: groupBySeatClassData?.[`${ESeatClass.BUSINESS}`]?.[0]?.price?.toString() ?? '',
    premiumEconomy: groupBySeatClassData?.[`${ESeatClass.PREMIUM_ECONOMY}`]?.[0]?.price?.toString() ?? '',
    economy: groupBySeatClassData?.[`${ESeatClass.ECONOMY}`]?.[0]?.price?.toString() ?? '',
    basicEconomy: groupBySeatClassData?.[`${ESeatClass.BASIC_ECONOMY}`]?.[0]?.price?.toString() ?? '',
    fromAirport: flight?.fromAirport?.name ?? '',
    toAirport: flight?.toAirport?.name ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [aiportsGroupByRegions, setAiportsGroupByRegions] = useState<DataGroupByType<Airport>[]>([]);
  const [isFromActive, setIsFromActive] = useState<boolean>(false);
  const [isToActive, setIsToActive] = useState<boolean>(false);
  const [fromAirportId, setFromAirportId] = useState<string>(flight?.fromAirport?.id ?? '');
  const [toAirportId, setToAirportId] = useState<string>(flight?.toAirport?.id ?? '');
  const [planes, setPlanes] = useState<Plane[]>([]);
  const {handleShowMessage} = useGlobalContext();
  const fetchData = async () => {
    try {
      const [data, planeData] = await Promise.all([
        getAllAirport(),
        getAllPlane(),
      ]);
      setAiportsGroupByRegions(data); 
      setPlanes(planeData.items); 
    } catch (error) {
      handleShowMessage(2,'Error when fetching data');
    }
  }

  useEffect(() => {
      fetchData();
  }, [])

  const handleOverlayOnClick = () => {
    callback();
  };

  const handleContentOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

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

    // Validate prices and other input fields
    [
      "windowPrice",
      "aislePrice",
      "exitSeat",
      "businessPrice",
      "premiumEconomy",
      "economy",
      "basicEconomy",
      "fromAirport",
      "toAirport",
    ].forEach((field) => {
      if (formData[field as keyof FormData] === "") {
        // newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
        newErrors[field] = `required.`;
      } else if (
        (field !== "fromAirport" && field !== "toAirport" && (isNaN(Number(formData[field as keyof FormData])) || Number(formData[field as keyof FormData]) < 0))
      ) {
        newErrors[field] = `Invalid value`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      if(!flight) {
        create();
      } else {
        update();
      }
    }
  };

  const handleChooseFromAirport = (id: string, value: string) => {
    setFromAirportId(id);
    setFormData((prev) => ({ ...prev, ["fromAirport"]: value }));
  }

  const handleChooseToAirport = (id: string, value: string) => {
    setToAirportId(id);
    setFormData((prev) => ({ ...prev, ["toAirport"]: value }));
  }

  const create = async() => {
    try {
      const check = await createFlight({
        name: formData.name,
        flightCode: formData.code,
        departureTime: formData.departureTime,
        duration: formData.duration,
        planeId: formData.plane,
        fromAirportId: fromAirportId,
        toAirportId: toAirportId,
        window_seat_price: parseFloat(formData.windowPrice),
        aisle_seat_price: parseFloat(formData.aislePrice),
        exit_row_seat_price: parseFloat(formData.exitSeat),
        business_price: parseFloat(formData.businessPrice),
        premium_economy_price: parseFloat(formData.premiumEconomy),
        economy_price: parseFloat(formData.economy),
        basic_economy_price: parseFloat(formData.basicEconomy),
      });
      if(check) {
        setIsDummy(!isDummy);
        callback();
        console.log('create new flight successfully');
        handleShowMessage(1, 'Create new flight successfully')
      } else {
        console.log('error');
      }
    } catch (error) {
      handleShowMessage(1, 'Create new flight failed');
    }
  }

  const update = async () => {
    try {
      const check = await UpdateFlightAndPrice(flight?.id!,{
        name: formData.name,
        flightCode: formData.code,
        departureTime: formData.departureTime,
        duration: formData.duration,
        planeId: formData.plane,
        fromAirportId: fromAirportId,
        toAirportId: toAirportId,
        window_seat_price: parseFloat(formData.windowPrice),
        aisle_seat_price: parseFloat(formData.aislePrice),
        exit_row_seat_price: parseFloat(formData.exitSeat),
        business_price: parseFloat(formData.businessPrice),
        premium_economy_price: parseFloat(formData.premiumEconomy),
        economy_price: parseFloat(formData.economy),
        basic_economy_price: parseFloat(formData.basicEconomy),
      }, flight?.flightsPrice!);
      if(check) {
        setIsDummy(!isDummy);
        callback();
        console.log('update flight successfully');
        handleShowMessage(1, "Update flight successfully");
      } else {
        console.log('error');
      }
    } catch (error) {
        handleShowMessage(2, 'Update flight failed');
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayOnClick}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.overlayContent} onClick={handleContentOnClick}>
          <h3 style={{ textAlign: "center", width: "100%" }}>Flight</h3>

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

          {/* Input Code */}
          <div className={styles.itemContainer}>
            <label className={styles.label} htmlFor="code">Flight Code</label>
            <input
              className={styles.input}
              type="text"
              name="code"
              id="code"
              placeholder="Code"
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
              {
                planes.map((plane,index) => {
                  return (
                    <option value={plane.id} key={index}>{plane.name}</option>
                  )
                })
              }
              {/* <option value="">Select an aircraft</option>
              <option value="boeing737">Boeing 737</option>
              <option value="airbusA320">Airbus A320</option>
              <option value="cessna172">Cessna 172</option>
              <option value="gulfstreamG650">Gulfstream G650</option> */}
            </select>
            {errors.plane && <p className={styles.error}>{errors.plane}</p>}
          </div>

          {/* Input for From and To Airport */}
          <div className={styles.rowAddContainer}>
            <div key={"fromAirport"} className={styles.itemContainer}>
              <label className={styles.label} htmlFor={"fromAirport"}>
                    {"fromAirport".replace(/([A-Z])/g, " $1")}
                  </label>
                  <div
                    className={`${styles.input} ${styles.listAirportContainer}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "28px"
                    }}
                    id={"toAirport"}
                  >{formData['fromAirport']}</div>
                    <div className={styles.airportContainer}>
                        {
                            aiportsGroupByRegions.map(({type, items}, index) => {
                                return (
                                    <div className={styles.regionContainer} key={index}>
                                        {type}
                                        <div className={styles.airportList}>
                                            {
                                                items.map((airport, index) => {
                                                    return (
                                                        <div className={styles.airportItem} key={airport.id ?? index} onClick={() => handleChooseFromAirport(airport.id!, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                                            {airport.name!}, {airport.location!} ({airport.code})
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                  {errors["fromAirport"] && <p className={styles.error}>{errors["fromAirport"]}</p>}
              </div>
              <div key={"toAirport"} className={styles.itemContainer}>
              <label className={styles.label} htmlFor={"toAirport"}>
                    {"toAirport".replace(/([A-Z])/g, " $1")}
                  </label>
                  <div
                    className={`${styles.input} ${styles.listAirportContainer}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    id={"toAirport"} 
                  >{formData["toAirport"]}</div>
                      <div className={styles.airportContainer}>
                          {
                              aiportsGroupByRegions.map(({type, items}, index) => {
                                  return (
                                      <div className={styles.regionContainer} key={index}>
                                          {type}
                                          <div className={styles.airportList}>
                                              {
                                                  items.map((airport, index) => {
                                                      return (
                                                          <div className={styles.airportItem} key={airport.id ?? index} onClick={() => handleChooseToAirport(airport.id!, `${airport.name!}, ${airport.location!} (${airport.code})`)}>
                                                              {airport.name!}, {airport.location!} ({airport.code})
                                                          </div>
                                                      )
                                                  })
                                              }
                                          </div>
                                      </div>
                                  )
                              })
                          }
                      </div>
                  {errors["toAirport"] && <p className={styles.error}>{errors["toAirport"]}</p>}
              </div>
          </div>

          {/* Price Fields */}
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
