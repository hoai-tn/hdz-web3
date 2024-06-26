import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

const index = () => {
  return (
    <Backdrop sx={{ color: "#fff" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default index;
