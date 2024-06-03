"use client";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { getRPC } from "@/app/contracts/utils/common";
import { ICampaign } from "@/app/types/crowdFunding";
import { formatTimestampToDate } from "@/app/utils";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, JsonRpcProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const [campaign, SetCampaign] = useState<ICampaign>();
  useEffect(() => {
    const getCampaign = async () => {
      const provider = new JsonRpcProvider(getRPC());
      const contract = new CrowdFundingContract(provider);

      const _campaign: ICampaign = await contract.getCampaign(params.id);
      SetCampaign({
        id: params.id,
        creator: _campaign.creator,
        title: _campaign.title,
        description: _campaign.description,
        goal: contract._toNumber(_campaign.goal),
        pledged: contract._toNumber(_campaign.pledged),
        image: _campaign.image,
        startAt: formatTimestampToDate(_campaign.startAt),
        endAt: new Date(Number(_campaign.endAt) * 1000).toISOString(),
        claimed: _campaign.claimed,
      });

      console.log({ campaign });
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
          <Typography>{campaign?.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {campaign?.description}
          </Typography>
          {JSON.stringify(campaign)}
          <Box>Creator: {campaign?.creator}</Box>
          <Box>Start Date: {campaign?.startAt} </Box>
          <Box>End Date: 20-01-2024</Box>
          <Box>Goal: 1 ETH</Box>
          <Box>Pledge Total: 20 ETH</Box>
          <Box>Pledge Member: 30</Box>
        </Grid>
      </Grid>
    </Container>
  );
}
