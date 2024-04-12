import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Tokenomics = () => {
  return (
    <Container id="tokenomics" sx={{ marginTop: 10 }}>
      <Typography variant="h4" align="center">
        Tokenomics
      </Typography>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5
        }}
      >
        <Image
          src="/img/tokenomics-pie-chart.png"
          width={600}
          height={600}
          alt="tokenomics-pie"
        />
        <Box position="relative">
          <Box position="absolute" right={-20} top={-40}>
            <Image
              src="/img/ear-cat.png"
              width={100}
              height={200}
              alt="banner"
            />
          </Box>
          <Box
            sx={{
              padding: 5,
              border: "7px solid #421b0f",
              maxWidth: 503,
              background: "#eda55c",
              
              borderRadius: "9px",
              marginTop: {
                xs: 3,
                md: 0,
              },
            }}
          >
            <Typography variant="h5">CAT Token Metrics</Typography>
            <Typography>
              $CTC tokenomics include smart staking rewards, meaning you can
              earn right away.
            </Typography>
            <ul className="list-disc pl-4 py-5">
              <li>35% used for staking rewards</li>
              <li>25% of supply sold in presale</li>
              <li>20% for team</li>
              <li>10% allocated to marketing</li>
              <li>10% used for liquidity</li>
            </ul>
            <Typography>
              $CTC Token Address: 
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Tokenomics;
