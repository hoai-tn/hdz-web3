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
        Our Cat Just Became More Rewarding
      </Typography>
      <Typography variant="subtitle2" align="center" marginTop={2}>
        Cat Coin brings the playful spirit of our beloved furry companions to
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
            GOOD BOY STAKING!
          </Typography>
          <Typography variant="subtitle2" align="center" marginTop={5}>
            Utilising smart contracts powered by Ethereum, DOGE20 is much more
            than a meme coin and brings passive earning potential to the
            community. Harness the power of your DOGE20 tokens by staking and
            earning rewards, making your tokens work for you.
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
          style={{ transform: "" }}
          className="scale-x-[-1]"
        />
        <Box>
          <Typography variant="h4" align="center">
            GOOD BOY STAKING!
          </Typography>
          <Typography variant="subtitle2" align="center" marginTop={5}>
            Utilising smart contracts powered by Ethereum, DOGE20 is much more
            than a meme coin and brings passive earning potential to the
            community. Harness the power of your DOGE20 tokens by staking and
            earning rewards, making your tokens work for you.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
