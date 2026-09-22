import { Outlet } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { GenreList } from "../../components/GenreList/GenreList";

export const PosterPage = () => {
  return (
    <>
      <Container>
        <GenreList />
      </Container>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
