import { Container } from "@mui/material";
import React from "react";

import CrowdFundingList from "@/app/components/CrowdFundingList"

const CrowdFunding = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4, }}>
        <div className="my-4">CrowdFunding</div>
        <CrowdFundingList/>
      </Container>
   
    </div>
  );
};

export default CrowdFunding;
