"use client";
import { useTheme } from "@emotion/react";
import { Box, Button, colors, ThemeOptions } from "@mui/material";
import React from "react";
const Home = () => {
  return (
    <div>
      <Button color="secondary">Secondary</Button>
      <Button>Secondary</Button>
      <Box
        sx={(theme) => ({
          color: theme.palette.primary.main,
        })}
      >
        asd
      </Box>
      <div className="bg-secondary">asdasdasd</div>
    </div>
  );
};

export default Home;
