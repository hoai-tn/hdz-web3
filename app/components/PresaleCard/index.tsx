"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const PresaleCard = () => {
  const [buyMethod, setBuyMethod] = useState<String>("ETH");
  return (
    <Box
      sx={{
        borderRadius: 4,
        padding: "22px 36px",
        maxWidth: 407,
        height: 600,
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
          px: 2,
          py: 1,
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

      {/* <BorderLinearProgress variant="determinate" value={50} /> */}
      <Box marginTop={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" fontSize={12} color="#9b8e8e">
            2,415,431,413 SATX
          </Typography>
          <Typography variant="subtitle2" fontSize={12} color="#9b8e8e">
            2,415,431,413 SATX
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={70}
          sx={{
            height: 28,
            borderRadius: 5,
            border: 2,
            borderColor: "#723813",
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" fontSize={12} color="#e78711">
            1,415,431,413 USD
          </Typography>
          <Typography variant="subtitle2" fontSize={12} color="#e78711">
            1,415,431,413 USD
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} textAlign="center" sx={{ mx: "auto" }}>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color="#9b8e8e"
          marginTop={1}
        >
          Your purchased DOGE20 = 0
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={12}
          color="#9b8e8e"
          marginTop={1}
        >
          Your stakeable DOGE20 = 0
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ mt: 1 }}
        />
        <Typography marginTop={1} color="green">
          1 DOGE20 = $0.00022
        </Typography>
        <Stack spacing={3} direction="row" marginTop={1}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setBuyMethod("ETH")}
          >
            ETH
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setBuyMethod("USDT")}
          >
            USDT
          </Button>
          <Button variant="outlined" size="large" disabled>
            CARD
          </Button>
        </Stack>
        <Box display="flex" gap={2}>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel
              htmlFor="standard-adornment-amount"
              sx={{ fontSize: 11 }}
            >
              Buy with ETH
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              endAdornment={
                <InputAdornment position="end">{buyMethod}</InputAdornment>
              }
              sx={{
                fontSize: 13,
              }}
              type="number"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 1 }} variant="outlined">
            <InputLabel
              htmlFor="standard-adornment-amount"
              sx={{ fontSize: 11 }}
            >
              Max Receive DOGE20
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              endAdornment={
                <InputAdornment position="end">{buyMethod}</InputAdornment>
              }
              sx={{
                fontSize: 13,
              }}
              type="number"
            />
          </FormControl>
        </Box>
        <Typography
          variant="subtitle2"
          fontSize={10}
          color="#cc3770"
          marginTop={1}
          align="center"
        >
          You do not have enough {buyMethod} to pay for this transaction.
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ mt: 1 }}
        />
      </Box>
      <Button>BUY NOW</Button>
    </Box>
  );
};

export default PresaleCard;
