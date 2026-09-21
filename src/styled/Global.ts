import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontsizes.medium};
    background-color: ${({ theme }) => theme.colors.dark.background};
    color: ${({ theme }) => theme.colors.dark.text};

    &.light-mode {
      background-color: ${({ theme }) => theme.colors.light.background};
      color: ${({ theme }) => theme.colors.light.text};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  img {
    width: 100%;
    display: block;
  }
`;
