"use client";
import { useTheme } from "@emotion/react";
import { Box, Button, colors, Container, ThemeOptions } from "@mui/material";
import React from "react";
import About from "./components/About";
import Tokenomics from "./components/Tokenomics";
import FAQ from "./components/FAQ";
import Image from "next/image";
const Home = () => {
  return (
    <div>
      <About />
      <Tokenomics />
      <Container maxWidth="md">
        <Image
         className="mx-auto scale-y-[-1]"
          src="/img/paws.png"
          width={150}
          height={100}
          alt="cat's-paws"
        />
      </Container>
      <FAQ />
    </div>
  );
};

export default Home;
//balance dailyreport
//balance dailyreport

//fee total comitsion
//profit precent compare balance
//withdraw lastransaction