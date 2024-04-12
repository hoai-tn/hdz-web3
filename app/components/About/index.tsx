import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <Container
      id="about"
      maxWidth="md"
      sx={{
        marginTop: 10,
      }}
    >
      <Typography variant="h4" align="center">
        Our $CTC Bringing Fun to the Crypto World
      </Typography>
      <Typography variant="subtitle2" align="center" marginTop={2}>
        $CTC coin brings the playful spirit of our beloved furry companions to
        the world of digital assets.
      </Typography>
      {/* <Image
        src="/img/underline-cat.png"
        width={1510}
        height={300}
        alt="banner"
      /> */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "flex",
          },
          justifyContent: "space-between",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <Image
          src="/img/cat-rocket.png"
          width={310}
          height={100}
          alt="cat-rocket"
        />
        <Box>
          <Typography variant="h4" align="center">
            CAT CUTE TO THE MOON!
          </Typography>
          <Typography variant="subtitle2" align="center" marginTop={5}>
            Consider the long-term potential of $CTC and its ability to address
            real-world problems or capture market demand. Short-term price
            fluctuations are common in the cryptocurrency market, but focusing
            on the project{`'`}s fundamentals and utility can provide a more
            informed perspective.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "flex",
          },
          justifyContent: "space-between",
          marginTop: 5,
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        <Image
          src="/img/cat-rocket.png"
          width={310}
          height={100}
          alt="cat-rocket"
          className="scale-x-[-1]"
        />
        <Box>
          <Typography variant="h4" align="center">
            CAT CUTE STAKING!
          </Typography>
          <Typography variant="subtitle2" align="center" marginTop={5}>
            To further incentivize participation and strengthen the network,
            $CTC offers lucrative staking rewards to its holders. By staking
            their $CTC tokens, investors can earn passive income in the form of
            additional tokens, compounding their earnings and maximizing their
            returns.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
