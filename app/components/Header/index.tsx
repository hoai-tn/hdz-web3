import { Box, Container } from "@mui/material";
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
          display: { xs: "block", md: "flex" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          paddingTop: 15,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Image src="/img/cat.png" width={300} height={100} alt="banner" />
        </Box>
        <PresaleCard />
      </Container>
    </Box>
  );
};

export default Header;
