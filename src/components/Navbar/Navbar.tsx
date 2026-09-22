import { NavLink } from "react-router-dom";
import { endpoints } from "../../data/Endpoints";
import { HeaderNavStyled, PosterNavStyled } from "./Navbar.styled";
import { useFetch } from "../../hooks/useFetch";
import type { GenreListProps } from "./Navbar.types";

export const HeaderNavbar = () => {
  return (
    <>
      <HeaderNavStyled>
        <ul>
          <li>
            <NavLink to={endpoints.}></NavLink>
          </li>
          <li>
            <NavLink to={endpoints.}></NavLink>
          </li>
          <li>
            <NavLink to={endpoints.}></NavLink>
          </li>
        </ul>
      </HeaderNavStyled>
    </>
  );
};



