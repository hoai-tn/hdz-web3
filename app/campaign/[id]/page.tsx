"use client";
import PledgeForm from "@/app/components/Campaign/PledgeForm";
import PledgedTabs from "@/app/components/Campaign/PledgedTabs";
import { useLoadingContext } from "@/app/context/LoadingContent";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { getRPC } from "@/app/contracts/utils/common";
import { CampaignState, ICampaign } from "@/app/types/crowdFunding";
import {
  formatTimestampToDate,
  handleCampaignState,
  handleShowCampaignDayState,
  handleShowCampaignStateLabel,
} from "@/app/utils";
import { setCampaign } from "@/lib/features/campaignSlice";
import { setUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Container, Grid, Typography } from "@mui/material";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { BrowserProvider, JsonRpcProvider, ethers } from "ethers";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { loading, setLoading } = useLoadingContext();
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const dispatch = useAppDispatch();
  const { campaign } = useAppSelector((state) => state.campaignSlice);
  const user = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const getCampaign = async () => {
      try {
        setLoading(true);
        const provider = new JsonRpcProvider(getRPC());
        const contract = new CrowdFundingContract(provider);

        const _campaign: ICampaign = await contract.getCampaign(params.id);

        dispatch(setCampaign({ ..._campaign }));

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCampaign();
  }, [params.id]);

  useEffect(() => {
    const getPledgeAmount = async () => {
      if (walletProvider && address) {
        const provider = new BrowserProvider(walletProvider);
        const contract = new CrowdFundingContract(provider);

        const amount = await contract.getPledgedAmount(params.id, address);

        dispatch(setUser({ address, walletProvider, pledgedAmount: amount }));
      } else {
        dispatch(
          setUser({ address: null, walletProvider: null, pledgedAmount: 0 })
        );
      }
    };
    getPledgeAmount();
  }, [walletProvider, address]);

  const daysLabel = useMemo(() => {
    return handleShowCampaignStateLabel(campaign.state);
  }, [campaign]);

  const valueDaysLabel = useMemo(() => {
    if (campaign) return handleShowCampaignDayState(campaign);
    return 0;
  }, [campaign]);
  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      {!loading ? (
        campaign?.goal ? (
          <Box>
            <div className="cover-image-container">
              <img src={campaign.image} alt="img" className="cover-image" />
            </div>
            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {[
                {
                  label: daysLabel,
                  value: valueDaysLabel,
                },
                {
                  label: "Goals",
                  value: campaign.goal,
                },
                {
                  label: "Pledged",
                  value: campaign.pledged,
                },
                {
                  label: "Your pledged",
                  value: user.pledgedAmount,
                },
                {
                  label: "Total Backers",
                  value: 200,
                },
              ].map((e, index) => {
                return (
                  <Box key={index} textAlign="center" color="white" width={200}>
                    <Box
                      fontSize={30}
                      bgcolor="#091605a8"
                      py={2}
                      sx={{ width: "inherit" }}
                    >
                      {e.value}
                    </Box>
                    <Box bgcolor="#48664d" py={1} sx={{ width: "inherit" }}>
                      {e.label}
                    </Box>
                  </Box>
                );
              })}
            </Box>
            <Grid container spacing={2} mt={3}>
              <Grid item xs={6} md={7}>
                <Typography>{campaign?.title}</Typography>
                <Box my={2}>Creator: {campaign.creator}</Box>
                <Typography variant="body2" color="text.secondary">
                  {campaign?.description}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={5}
                bgcolor="#a6b678"
                borderRadius={4}
                px={3}
                py={2}
              >
                {campaign.claimed ? (
                  " This campaign has already been claimed by the creator."
                ) : (
                  <PledgedTabs />
                )}
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography fontSize={20}>
            Campaign <b>{params.id}</b> could not found, please back to
            crowdfunding page.
          </Typography>
        )
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
