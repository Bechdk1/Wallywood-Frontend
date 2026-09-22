import type { ContentWrapperProps } from "../../types/types";
import { ContentWrapperStyled } from "./ContentWrapper.styled";

export const ContentWrapper = ({ title, children }: ContentWrapperProps) => {
  <ContentWrapperStyled innerHTML="section" title={title}>
    {children}
  </ContentWrapperStyled>;
};
