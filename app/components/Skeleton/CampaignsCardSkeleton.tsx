import { Box, Skeleton } from "@mui/material";
import React from "react";

const CampaignsCardSkeleton = () => {
  return (
    <Box>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <Skeleton animation="wave" height={45} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={25} width="80%" />
      <Skeleton animation="wave" height={25} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={25} width="70%" />
      <Skeleton animation="wave" height={25} width="90%" />
    </Box>
  );
};

export default CampaignsCardSkeleton;
