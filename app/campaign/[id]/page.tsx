"use client";
import PledgeForm from "@/app/components/Campaign/PledgeForm";
import PledgedTabs from "@/app/components/Campaign/PledgedTabs";
import { useLoadingContext } from "@/app/context/LoadingContent";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { getRPC } from "@/app/contracts/utils/common";
import { ICampaign } from "@/app/types/crowdFunding";
import {
  handleShowCampaignDayState,
  handleShowCampaignStateLabel,
} from "@/app/utils";
import { setCampaign } from "@/lib/features/campaignSlice";
import { setUser } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
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
    return () => {
      dispatch(setCampaign(null));
    };
  }, []);

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
    if (campaign?.state) return handleShowCampaignStateLabel(campaign.state);
    return "Loading Label";
  }, [campaign]);

  const valueDaysLabel = useMemo(() => {
    if (campaign) return handleShowCampaignDayState(campaign);
    return 0;
  }, [campaign]);
  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
      {!loading && campaign !== null && !Object.keys(campaign).length ? (
        <Typography fontSize={20}>
          Campaign <b>{params.id}</b> could not found, please back to
          crowdfunding page.
        </Typography>
      ) : (
        <Box>
          <div className="cover-image-container">
            {campaign?.image ? (
              <img src={campaign.image} alt="img" className="cover-image" />
            ) : (
              <Skeleton
                sx={{ height: 490 }}
                animation="wave"
                variant="rectangular"
              />
            )}
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
                value: campaign?.goal || 0,
              },
              {
                label: "Pledged",
                value: campaign?.pledged || 0,
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
              {campaign?.title ? (
                <Typography>{campaign?.title}</Typography>
              ) : (
                <Skeleton animation="wave" height={25} width="20%" />
              )}

              {campaign?.creator ? (
                <Box my={2}>Creator: {campaign?.creator}</Box>
              ) : (
                <Skeleton animation="wave" height={25} width="70%" />
              )}
              {campaign?.description ? (
                <Typography variant="body2" color="text.secondary">
                  {campaign?.description}
                </Typography>
              ) : (
                <Skeleton height={225} animation="wave" width="95%" />
              )}
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
              {campaign?.claimed ? (
                " This campaign has already been claimed by the creator."
              ) : (
                <PledgedTabs />
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
