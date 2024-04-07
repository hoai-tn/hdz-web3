"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#00bcd4",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#ffc400",
      dark: "#ba000d",
      contrastText: "#000",
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
