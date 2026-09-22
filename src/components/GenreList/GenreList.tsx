import { NavLink } from "react-router-dom";
import { endpoints } from "../../data/Endpoints";
import type { GenreListProps } from "./GenreList.types";
import { useFetch } from "../../hooks/useFetch";

export const GenreList = () => {
  const { data, isLoading, error } = useFetch<GenreListProps[]>(
    endpoints.genres,
  );

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h4>Filtre</h4>

      <ul>
        {data &&
          data.map((item) => {
            return (
              <li key={item.id} title={item.title}>
                <NavLink to={`${endpoints.genres}/${item.id}`}>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </>
  );
};
