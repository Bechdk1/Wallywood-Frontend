import { endpoints } from "../../data/Endpoints";
import { useFetch } from "../../hooks/useFetch";

export const PosterListModule = () => {
  const { data, isLoading, error } = useFetch(endpoints.genres);

  if (isLoading) { return <p>loading</p>; }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
     {data}


    </>
  )

};
