import React from "react";
import CrowdFundingCard from "../CampaignCard";
import { Box, Grid } from "@mui/material";
const index = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
    >
      {[1, 2, 3, 4, 5,3,4,3,123,123,123,123,123,1231].map((element, index) => {
        return (
          <Grid key={index} item  xs={12} sm={6} md={3}>
              <CrowdFundingCard />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default index;
