import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Countryitem from "./CountryItem";
import { useCities } from "../context/CitiesContext";
function CountryList() {
  const { cities, Isloading } = useCities();
  if (Isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by click on a city on the map" />
    );
  const country = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {country.map((country) => (
        <Countryitem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
