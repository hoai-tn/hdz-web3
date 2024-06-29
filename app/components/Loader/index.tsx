import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Typography } from "@mui/material";

const index = () => {
  return (
    <Backdrop sx={{ color: "#fff" }} open={true}>
      <CircularProgress color="inherit" size={90}/>
    </Backdrop>
  );
};

export default index;
