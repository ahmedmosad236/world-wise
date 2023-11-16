import { Link } from "react-router-dom";
import styles from "./Cityitem.module.css";
import { useCities } from "../context/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function Cityitem({ city }) {
  const { currentCity, DeleteCountry } = useCities();
  const { cityName, emoji, date, id, position } = city;
  function handleDelete(e) {
    e.preventDefault();
    DeleteCountry(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <img
          className={styles.emoji}
          src={`https://flagcdn.com/${emoji.toLowerCase()}.svg`}
          alt={`Flag of ${emoji}`}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default Cityitem;
