export const theme = {
  colors: {
    primary: "#2BBBDE",
    secondary: "#EDEDED",
    tertiary: "#03689C",
    grey: "#efefef",
    goalsBackground: "#eee",
    white: "#fff",
    black: "#000",
    border: "#ccc",
    buttonBackground: "#f7ebec",
    light: {
      background: "#fff",
      text: "#222",
    },
    dark: {
      background: "#1e1e1e",
      text: "#ffffff",
      surface: "#172638",
      mutedText: "#b8c8d9",
      border: "#34475c",
      control: "#243b53",
      accent: "#8dc4ff",
    },
  },
  fonts: {
    heading: "'Oswald', sans-serif",
    body: "'Open Sans', Arial, sans-serif",
  },
  fontsizes: {
    body: "14px",
    medium: "16px",
    navigation: "18px",
    h3: "20px",
    h2: "24px",
    mobileHeading: "25px",
    h1: "30px",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.4,
    heading: 1.5,
  },
  shadows: {
    input: "inset 1px 1px 3px #0004",
    button: "0 4px 4px #0002",
  },
  radii: {
    control: "4px",
  },
  layout: {
    contentWidth: "1262px",
  },
  breakpoints: {
    mobile: "600px",
    footer: "800px",
    goals: "1000px",
    header: "1150px",
    navigation: "1400px",
  },
} as const;

export type Theme = typeof theme;
