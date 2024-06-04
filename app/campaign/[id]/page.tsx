"use client";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { getRPC } from "@/app/contracts/utils/common";
import { ICampaign } from "@/app/types/crowdFunding";
import { formatTimestampToDate } from "@/app/utils";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
        startAt: formatTimestampToDate(Number(_campaign.startAt)),
        endAt: formatTimestampToDate(Number(_campaign.endAt)),
        claimed: _campaign.claimed,
      });
    };
    // try {
    getCampaign();
    // } catch (error) {
    //   console.error("Error fetching campaign data:", error);
    // }
  }, [params.id]);
  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      {campaign?.creator ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} md={10}>
              <div className="cover-image-container">
                <img src={campaign.image} alt="img" className="cover-image" />
              </div>
            </Grid>
            <Grid item md={2} sx={{ display: "flex", flexDirection: "column", borderRadius: 4 }}>
              {[
                {
                  label: "Days Left",
                  value: 1,
                },
                {
                  label: "Goals",
                  value: campaign.goal,
                },
                {
                  label: "Pledged",
                  value: campaign.pledged,
                },
              ].map((e) => {
                return (
                  <Box
                    px={4}
                    my={1}
                    key={e.label}
                    textAlign="center"
                    color="white"
                  >
                    <Box fontSize={30} bgcolor="#091605a8" py={2}>
                      {e.value}
                    </Box>
                    <Box bgcolor="#333310" py={1}>
                      {e.label}
                    </Box>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={6} md={8}>
              <Typography>{campaign?.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {campaign?.description}
              </Typography>
              <Box>Creator: {campaign.creator}</Box>
              <Box>Start Date: {campaign?.startAt.toString()} </Box>
              <Box>End Date: {campaign?.endAt.toString()}</Box>
              <Box>Goal: {campaign?.goal} HDZ</Box>
              <Box>Pledge Total: {campaign?.pledged} HDZ</Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box>
                <Typography>Pledge to the campaign</Typography>
                <TextField
                  id="outlined-uncontrolled"
                  label="Title"
                  fullWidth
                  // onChange={(e) => {
                  //   setCampaign({ ...campaign, title: e.target.value });
                  // }}
                />
                <Box>
                  <Typography>Back it because you belive in it</Typography>
                  <Typography>
                    Support the project for no reward, just because it speaks to
                    you
                  </Typography>
                </Box>
                <Button>Plege</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
