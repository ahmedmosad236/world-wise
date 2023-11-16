import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesContext";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import Button from "./Button";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCountry } = useCities();
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function geolocationFetch() {
        try {
          setIsLoading(true);
          setGeoError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city, click somewhere else 😗"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setGeoError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      geolocationFetch();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName && !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id: new Date(),
    };
    createCountry(newCity);
    navigate("/app/cities");
  }

  if (isLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={"Start by click on a city"} />;
  if (geoError) return <Message message={geoError} />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          dateformat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
