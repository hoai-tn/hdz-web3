import React, { useEffect, useMemo, useState } from "react";
import CrowdFundingCard from "../CampaignCard";
import { Grid, Skeleton, Typography } from "@mui/material";
import { ICampaign } from "@/app/types/crowdFunding";
import { useLoadingContext } from "@/app/context/LoadingContent";
import CampaignsCardSkeleton from "../Skeleton/CampaignsCardSkeleton";
const index = ({ campaigns }: { campaigns: ICampaign[] | null }) => {
  const { loading } = useLoadingContext();
  const renderCampaignsList = useMemo(() => {
    if (loading || !campaigns) {
      return [1, 2, 3, 4].map((e) => (
        <Grid key={e} item xs={12} sm={6} md={3}>
          <CampaignsCardSkeleton />
        </Grid>
      ));
    } else {
      if (campaigns?.length) {
        return campaigns.map((campaign, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <CrowdFundingCard campaign={campaign} />
            </Grid>
          );
        });
      }
      return <Typography variant="h4">There are no campaigns </Typography>;
    }
  }, [loading, campaigns]);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {renderCampaignsList}
    </Grid>
  );
};
export default index;
