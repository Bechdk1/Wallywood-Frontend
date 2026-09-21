import { useState, useEffect } from "react";
import { CYCLE_MS } from "../components/Loader/Loader.styled";

/** Én hel flyverunde, så loaderen altid vises som præcis én cyklus. */
const DELAY = CYCLE_MS;

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getApiResponse = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(url);
        const json: T = await data.json();
        setTimeout(() => {
          setData(json);
          setIsLoading(false);
        }, DELAY);
      } catch {
        setError("Error");
      }
    };

    getApiResponse();
  }, [url]);

  return { data, isLoading, error };
};
