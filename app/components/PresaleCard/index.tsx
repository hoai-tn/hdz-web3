import { Box, Typography } from "@mui/material";
import React from "react";

const PresaleCard = () => {
  return (
    <Box
      sx={{
        borderRadius: 4,
        padding: "22px 20px",
        maxWidth: 407,
        height: 549,
        backgroundImage: `url('/img/white-board.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Typography textAlign="center" fontSize={20} fontWeight={800}>
        CTC launches on doge day! Last chance to buy!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#d4e06a",
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography>12</Typography>
          <Typography fontSize={12}>Day</Typography>
        </Box>
        <Box>
          <Typography>03</Typography>
          <Typography fontSize={12}>HRS</Typography>
        </Box>
        <Box>
          <Typography>12</Typography>
          <Typography fontSize={12}>MINS</Typography>
        </Box>
        <Box>
          <Typography>12</Typography>
          <Typography fontSize={12}>SEC</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PresaleCard;
