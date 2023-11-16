import { useEffect, useState } from "react";

const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const cities = localStorage.getItem(key);
    return cities ? JSON.parse(cities) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
