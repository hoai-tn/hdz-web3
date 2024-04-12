import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import PresaleCard from "../PresaleCard";

const Header = () => {
  return (
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
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              background: "#ffffff00",
              backdropFilter: "blur(2px)",
              padding: "20px",
              maxWidth: 592,
            }}
          >
            <Typography variant="h2">CAT CUTE IS HERE</Typography>
            <Typography variant="subtitle1">
              The $CTX Presale is live NOW! Buy and stake today for huge
              rewards! Get in early or get left behind.
            </Typography>
            <Stack spacing={3} direction="row" marginTop={2}>
              <Button variant="contained" sx={{ color: "white" }}>
                WHITEPAER
              </Button>
              <Button variant="outlined">AUDIT</Button>
            </Stack>
          </Box>
          {/* <Image src="/img/cat.png" width={300} height={100} alt="banner" /> */}
        </Box>
        <PresaleCard />
      </Container>
    </Box>
  );
};

export default Header;
