"use client";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    // <Box sx={{backgroundImage: url('/img/cartoon-banner.jpg')}}>

    <Box
      sx={{
        backgroundImage: `url('/img/cartoon-banner.jpg')`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <Image
        src="/img/cartoon-banner.jpg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }} // optional
        alt="banner"
      /> */}
      <Container
        maxWidth="lg"
        sx={{
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <Image src="/img/cat.png" width={300} height={100} alt="banner" />
        <Box
          sx={{
            // border: 3,
            // borderColor: "#2c0100",
            borderRadius: 4,
            padding: "15px 82px",
            // bgcolor: "primary.main",
            maxWidth: 694,
            height: 593,
            backgroundImage: `url('/img/white-board1.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
      </Container>
    </Box>
  );
};

export default Header;
