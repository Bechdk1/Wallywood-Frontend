import type { ContainerProps } from "../../types/types";
import { ContainerStyled } from "./Container.styled";

export const Container = ({
  innerHTML = "div",
  className,
  color,
  children,
  title,
}: ContainerProps) => (
  <ContainerStyled
    as={innerHTML}
    $innerHTML={innerHTML}
    $color={color}
    className={className}
    title={title}
  >
    {children}
  </ContainerStyled>
);
