export const theme = {
  colors: {
    /* Figma variables */
    bordouxRed: "#5C1F06",
    orangeSet: "#D97852",
    buttonSkin: "#D1B3A7",
    raisinBlack: "#1D1E2C",

    /* Semantic aliases */
    primary: "#D97852",
    secondary: "#D1B3A7",
    pageBackground: "#5C1F06",
    bodyBackground: "#FFFFFF",
    surface: "#F8F6F5",
    text: "#000000",
    mutedText: "#1D1E2C",
    placeholder: "#BBBBBB",
    border: "#D1B3A7",
    controlBorder: "#524641",
    inputBackground: "rgba(92, 31, 6, 0.04)",
    white: "#FFFFFF",
    black: "#000000",
  },
  fonts: {
    heading: "'Titillium Web', sans-serif",
    body: "'Open Sans', Arial, sans-serif",
    ui: "'Poppins', Arial, sans-serif",
  },
  fontsizes: {
    body: "14px",
    content: "14px",
    placeholder: "14px",
    navigation: "18px",
    h2: "20px",
    h1: "34px",
    logo: "54px",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    body: "normal",
    heading: "normal",
  },
  shadows: {
    input: "inset 0px 1px 4px 0px rgba(0, 0, 0, 0.06)",
  },
  radii: {
    control: "3px",
  },
  layout: {
    pageWidth: "1440px",
    bodyWidth: "1080px",
    contentWidth: "1000px",
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
