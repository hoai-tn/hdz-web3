import { CampaignActionState, CampaignState } from "@/app/types/crowdFunding";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { BrowserProvider } from "ethers";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { setCampaign } from "@/lib/features/campaignSlice";
import { setUser } from "@/lib/features/userSlice";

const RefundTab = () => {
  const { campaign } = useAppSelector(
    (state) => state.campaignSlice
  );
  const user = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const isAllowRefund = useMemo(() => {
    return (
      campaign.state == CampaignState.Ended &&
      user.pledgedAmount > 0 &&
      campaign.goal > campaign.pledged
    );
  }, [campaign, user]);

  const handleConfirm = async () => {
    if (user.walletProvider) {
      setIsLoading(true);
      const provider = await new BrowserProvider(
        user.walletProvider
      ).getSigner();
      const contract = new CrowdFundingContract(provider);
      await contract.refund(campaign.id);
      dispatch(
        setCampaign({
          ...campaign,
          pledged: campaign.pledged - user.pledgedAmount,
        })
      );
      dispatch(setUser({ ...user, pledgedAmount: 0 }));
      setIsLoading(false);
      setIsOpenConfirmModal(false);
    }
  };
  return (
    <Box>
      <Button
        color="success"
        variant="contained"
        disabled={!isAllowRefund}
        onClick={() => setIsOpenConfirmModal(true)}
      >
        Refund
      </Button>
      <Box
        bgcolor="#48664d"
        px={2}
        py={1}
        my={2}
        borderRadius={4}
        color="white"
      >
        <Typography>
          Refunds are only available after the campaign ended. Once the campaign
          starts, refunds cannot be processed. Please consider this policy
          before making your contribution. Thank you for your understanding.
        </Typography>
      </Box>
      <ConfirmModal
        open={isOpenConfirmModal}
        isLoading={isLoading}
        actionState={CampaignActionState.Refund}
        handleClose={() => {
          setIsOpenConfirmModal(false);
          setIsLoading(false);
        }}
        handleConfirm={handleConfirm}
      />
    </Box>
  );
};

export default RefundTab;
