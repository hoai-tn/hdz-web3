"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

import CrowdFundingList from "@/app/components/CrowdFundingList";
import CreateCampaignModal from "../components/Modal/CreateCampaign";

const CrowdFunding = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCreateCampaign = (campaign) => {
    console.log({ campaign });
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
