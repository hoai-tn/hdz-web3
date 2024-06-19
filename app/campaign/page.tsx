"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import CrowdFundingList from "@/app/components/CampaignList";
import CreateCampaignModal from "../components/Modal/CreateCampaign";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { BrowserProvider, JsonRpcProvider, ethers } from "ethers";
import { useWeb3Modal, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ICampaign, ICreateCampaign } from "../types/crowdFunding";
import { getRPC } from "../contracts/utils/common";
import { formatTimestampToDate, handleCampaignState } from "../utils";
const CrowdFunding = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const { open: openConnectWallet } = useWeb3Modal();

  const [open, setOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = useCallback(async () => {
    const provider = new JsonRpcProvider(getRPC());
    const contract = new CrowdFundingContract(provider);
    let getAllCampaigns: ICampaign[] = await contract.getAllCampaign();
    console.log({ getAllCampaigns });
    getAllCampaigns = getAllCampaigns.map((campaign: ICampaign) => {
      return campaign
    });
    setCampaigns(getAllCampaigns);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCreateCampaign = async (campaign: ICreateCampaign) => {
    if (!walletProvider) {
      openConnectWallet();
      return;
    }
    const provider = await new BrowserProvider(walletProvider).getSigner();
    const contract = new CrowdFundingContract(provider);

    await contract.createCampaign(campaign);

    await getCampaigns();
    setOpen(false);
  };

  const handleClose = () => {
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
          <Typography>All Campaigns ({campaigns.length})</Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Campaign
          </Button>
        </Box>
        <CrowdFundingList campaigns={campaigns} />
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
