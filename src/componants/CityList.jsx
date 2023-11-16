import Cityitem from "./Cityitem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../context/CitiesContext";
function CityList() {
  const { cities, Isloading } = useCities();
  if (Isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by click on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
