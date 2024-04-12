import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      display="flex"
      alignItems="end"
      justifyContent='center'
      style={{
        backgroundImage: `url(/img/footer-bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 500,
      }}
    >
      <Typography variant="h6" align="center" paddingBottom={2}>
        © 2024 | CAT CUTE | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
