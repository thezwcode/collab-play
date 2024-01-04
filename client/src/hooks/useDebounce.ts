import React, { useEffect, useState } from "react";

function useDebounce<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)
  const [debounceValue, setDebounceValue] = useState<T>(initialValue)
  useEffect(() => {
    setTimeout(() => {
      if (value !== debounceValue) {
        setDebounceValue(value)
      }
    }, 700)
  }, [value])
  return [
    debounceValue, setValue
  ]
};

export default useDebounce;
