import { CampaignActionState, CampaignState } from "@/app/types/crowdFunding";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Tooltip } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { BrowserProvider } from "ethers";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { setCampaign } from "@/lib/features/campaignSlice";

const CreatorTab = () => {
  const { campaign } = useAppSelector((state) => state.campaignSlice);
  const user = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [actionStateCreator, setActionStateCreator] = useState(
    CampaignActionState.None
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpenConfirmModal) setIsLoading(false);
  }, [isOpenConfirmModal]);

  const isDisableClaim = useMemo(() => {
    return (
      campaign.state !== CampaignState.Ended ||
      campaign.creator !== user.address ||
      campaign.pledged < campaign.goal ||
      campaign.claimed
    );
  }, [campaign]);

  const isDisableCancel = useMemo(() => {
    return (
      campaign.state !== CampaignState.NotStart ||
      campaign.creator !== user.address
    );
  }, [campaign]);

  const handleConfirm = () => {
    if (actionStateCreator === CampaignActionState.Cancel) {
      handleCancel();
    } else {
      handleClaim();
    }
  };

  const handleCancel = async () => {
    if (user.walletProvider) {
      setIsLoading(true);
      const provider = await new BrowserProvider(
        user.walletProvider
      ).getSigner();
      const contract = new CrowdFundingContract(provider);
      await contract.cancel(campaign.id);
      dispatch(setCampaign({}));
      setIsLoading(false);
    }
  };

  const handleClaim = async () => {
    if (user.walletProvider) {
      setIsLoading(true);
      const provider = await new BrowserProvider(
        user.walletProvider
      ).getSigner();
      const contract = new CrowdFundingContract(provider);
      await contract.claim(campaign.id);
      dispatch(setCampaign({ ...campaign, claimed: true }));
      setIsLoading(false);
    }
  };

  const handleClick = (actionState: CampaignActionState) => {
    setActionStateCreator(actionState);
    setIsOpenConfirmModal(true);
  };
  return (
    <Box>
      <Tooltip
        title="Click to claim your rewards from the current campaign. Ensure you meet all eligibility criteria before claiming"
        arrow
        followCursor
        sx={{ mr: 4 }}
      >
        <Button
          color="success"
          variant="contained"
          disabled={isDisableClaim}
          onClick={() => handleClick(CampaignActionState.Claimed)}
        >
          Claim
        </Button>
      </Tooltip>
      <Tooltip
        title="Canceling this campaign will permanently end it and all associated activities."
        arrow
        followCursor
      >
        <Button
          color="error"
          variant="contained"
          disabled={isDisableCancel}
          onClick={() => handleClick(CampaignActionState.Cancel)}
        >
          Cancel
        </Button>
      </Tooltip>
      <ConfirmModal
        open={isOpenConfirmModal}
        isLoading={isLoading}
        actionState={actionStateCreator}
        handleClose={() => setIsOpenConfirmModal(false)}
        handleConfirm={handleConfirm}
      />
    </Box>
  );
};

export default CreatorTab;
