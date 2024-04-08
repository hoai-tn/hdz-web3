"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1350,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "inherit",
    fontSize: 15,
    allVariants: {
      color: "inherit",
    },
  },
  palette: {
    primary: {
      main: "#eda55c",
      contrastText: "inherit",
    },
    secondary: {
      main: "#0d1421",
      contrastText: "inherit",
    },
  },
});
interface IProviders {
  children: ReactNode;
}
const Providers = ({ children }: IProviders) => {
  return <ThemeProvider theme={theme}> {children}</ThemeProvider>;
};

export default Providers;
