import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const currentCities = [
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "ES",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "DE",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
  {
    cityName: "South Slave Region",
    country: "Canada",
    emoji: "CA",
    date: "2023-11-14T19:15:11.865Z",
    notes: "nice city",
    id: "2d8e88b6-3d67-4126-97c3-799062c37653",
    position: {
      lat: "60.845398336292845",
      lng: "-107.92968750000001",
    },
  },
  {
    cityName: "Amerzgane",
    country: "Morocco",
    emoji: "MA",
    date: "2023-11-14T19:16:31.826Z",
    notes: "Amazing City",
    id: "bcf9c03c-cf3a-4d67-a835-c6bf63a8347f",
    position: {
      lat: "30.847083835164838",
      lng: "-7.138261298128635",
    },
  },
  {
    cityName: "Peixoto de Azevedo",
    country: "Brazil",
    emoji: "BR",
    date: "2023-11-14T19:17:07.401Z",
    notes: "Good City",
    id: "e652daf8-f91d-4c06-be4f-182101ba2374",
    position: {
      lat: "-10.324830356017559",
      lng: "-53.21240086366223",
    },
  },
];

const Citiescontext = createContext();
function CitiesProvider({ children }) {
  const [cities, setCities] = useLocalStorage(currentCities, "cities");
  const [currentCity, setCurrentCity] = useState({});

  const createCountry = (newCity) => {
    setCurrentCity(newCity);
    setCities((prev) => [...prev, newCity]);
  };

  const getCountry = (id) => {
    setCurrentCity(cities.filter((item) => item.id.toString() === id)[0]);
  };

  const DeleteCountry = (id) =>
    setCities((prev) => prev.filter((item) => item.id !== id));

  return (
    <Citiescontext.Provider
      value={{
        cities: cities,
        currentCity,
        createCountry,
        DeleteCountry,
        getCountry,
      }}
    >
      {children}
    </Citiescontext.Provider>
  );
}

function useCities() {
  const context = useContext(Citiescontext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
