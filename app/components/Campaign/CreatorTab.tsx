import { CampaignActionState, CampaignState } from "@/app/types/crowdFunding";
import { useAppSelector } from "@/lib/hooks";
import { Box, Button, Tooltip } from "@mui/material";
import React, { useMemo } from "react";
import ConfirmModal from "../Modal/ConfirmModal";

const CreatorTab = () => {
  const { campaign, campaignState } = useAppSelector(
    (state) => state.campaignSlice
  );
  const user = useAppSelector((state) => state.userSlice);

  const isDisableClaim = useMemo(() => {
    return (
      campaignState !== CampaignState.Ended ||
      campaign.creator !== user.address ||
      campaign.pledged == campaign.goal ||
      !campaign.claimed
    );
  }, [campaign, campaignState]);

  const isDisableCancel = useMemo(() => {
    return (
      campaignState !== CampaignState.NotStart ||
      campaign.creator !== user.address
    );
  }, [campaign, campaignState]);


  return (
    <Box>
      <Tooltip
        title="Click to claim your rewards from the current campaign. Ensure you meet all eligibility criteria before claiming"
        arrow
        followCursor
        sx={{ mr: 4 }}
      >
        <Button color="success" variant="contained" disabled={isDisableClaim}>
          Claim
        </Button>
      </Tooltip>
      <Tooltip
        title="Canceling this campaign will permanently end it and all associated activities."
        arrow
        followCursor
      >
        <Button color="error" variant="contained" disabled={isDisableCancel}>
          Cancel
        </Button>
      </Tooltip>
      {/* <ConfirmModal
        open={openConfirmModal}
        isLoading={isSendingPledged}
        actionState={actionState}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={handleConfirm}
      /> */}
    </Box>
  );
};

export default CreatorTab;
