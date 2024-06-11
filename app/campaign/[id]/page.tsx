"use client";
import PledgeForm from "@/app/components/Campaign/PledgeForm";
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
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const [campaign, SetCampaign] = useState<ICampaign>();
  useEffect(() => {
    const getCampaign = async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    };
    getCampaign();
  }, [params.id]);

  const isStarted = useMemo(() => {
    if (campaign) {
      return moment() >= moment(campaign.startAt);
    }
    return false;
  }, [campaign]);

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
            <Grid
              item
              md={2}
              sx={{ display: "flex", flexDirection: "column", borderRadius: 4 }}
            >
              {[
                {
                  label: `${isStarted? 'Days Left': 'Days Start'} `,
                  value: isStarted
                    ? moment(campaign.endAt).diff(campaign.startAt, "days")
                    : campaign.startAt,
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
                    <Box bgcolor="#48664d" py={1}>
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
              <Box my={2}>Creator: {campaign.creator}</Box>
              <Typography variant="body2" color="text.secondary">
                {campaign?.description} random text random text random text
                random text random text random text random text random text
                random text random text random text random text random text
                random text random text random text random text random text
                random text random text
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              bgcolor="#a6b678"
              borderRadius={4}
              px={3}
              py={2}
            >
              <PledgeForm campaign={params.id} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
