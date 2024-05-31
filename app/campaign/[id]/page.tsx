"use client"
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { ICampaign } from "@/app/types/crowdFunding";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider } from "ethers";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { walletProvider } = useWeb3ModalProvider();
  const [campaign, SetCampaign] = useState<ICampaign>();
  useEffect(() => {
    const getCampaign = async () => {
      if (walletProvider) {
        const provider = await new BrowserProvider(walletProvider).getSigner();
        const contract = new CrowdFundingContract(provider);

        const _campaign = await contract.getCampaign(params.id);
        SetCampaign(_campaign);
      }
    };
    getCampaign();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <img
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="img"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          gap={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography>Title Lizard crypto {params.id}</Typography>
          <Typography variant="body2" color="text.secondary">
            {JSON.stringify(campaign)}
            Lizards are a wide spread group ofLizards are a wides pread group
            ofLizards are a widespread group of Lizards are a wide spread group
            ofLizards are a wides pread group ofLizards are a wide spread group
            ofLizards are a wides pread group ofLizards are a widespread group
            of
          </Typography>
          <Box>Creator: 0x213123123123123</Box>
          <Box>Start Date: 20-01-2024</Box>
          <Box>End Date: 20-01-2024</Box>
          <Box>Goal: 1 ETH</Box>
          <Box>Pledge Total: 20 ETH</Box>
          <Box>Pledge Member: 30</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
