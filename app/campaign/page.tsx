"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

import CrowdFundingList from "@/app/components/CrowdFundingList";
import CreateCampaignModal from "../components/Modal/CreateCampaign";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { BrowserProvider, ethers } from "ethers";
import { RPC_TESTNET } from "../contracts/utils/common";
import { useWeb3Modal, useWeb3ModalProvider } from "@web3modal/ethers/react";
const CrowdFunding = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { open: openConnectWallet } = useWeb3Modal();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCreateCampaign = async (campaign) => {
    if (!walletProvider) {
      openConnectWallet();
      return;
    }
    const provider = await new BrowserProvider(walletProvider).getSigner();
    const contract = new CrowdFundingContract(provider);

    const startDateTimestamp = new Date(campaign.startDate).getTime() / 1000;
    const endDateTimestamp = new Date(campaign.endDate).getTime() / 1000;

    await contract.createCampaign({
      ...campaign,
      goal: contract._numberToEth(campaign.goal),
      startDate: startDateTimestamp,
      endDate: endDateTimestamp,
    });

    setOpen(false);
  };

  const handleClose = (e) => {
    console.log({ e });
    setOpen(false);
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Typography>All Campaigns (2)</Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Campaign
          </Button>
        </Box>
        <CrowdFundingList />
        <CreateCampaignModal
          open={open}
          handleClose={handleClose}
          handleCreateCampaign={handleCreateCampaign}
        />
      </Container>
    </div>
  );
};

export default CrowdFunding;
