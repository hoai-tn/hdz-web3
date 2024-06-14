import React, { useEffect, useState } from "react";
import CrowdFundingCard from "../CampaignCard";
import { Grid } from "@mui/material";
import { ICampaign } from "@/app/types/crowdFunding";
const index = ({ campaigns }: { campaigns: ICampaign[] }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {campaigns.length
        ? campaigns.map((campaign, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <CrowdFundingCard campaign={campaign} />
              </Grid>
            );
          })
        : "loading"}
    </Grid>
  );
};

export default index;
