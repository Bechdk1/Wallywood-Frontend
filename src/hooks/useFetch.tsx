import { useState, useEffect } from "react";

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
        }, 2000);
      } catch {
        setError("Error");
      }
    };

    getApiResponse();
  }, [url]);

  return { data, isLoading, error };
};
