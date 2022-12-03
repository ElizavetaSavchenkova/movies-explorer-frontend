import { useState, useEffect } from 'react';

function getNewValue(key, defaultValue) {
  const avaliable = localStorage.getItem(key);
  const original = JSON.parse(avaliable);
  return original || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getNewValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(key)
  }, [key, value]);

  return [value, setValue];
};
