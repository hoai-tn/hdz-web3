import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { BrowserProvider } from "ethers";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import { useWeb3Modal } from "@web3modal/ethers/react";
import HDZContract from "@/app/contracts/HDZContract";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCampaign } from "@/lib/features/campaignSlice";
import { CampaignActionState } from "@/app/types/crowdFunding";
import { setUser } from "@/lib/features/userSlice";

const PledgeForm = ({ actionState }: { actionState: CampaignActionState }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [notificationModal, setNotificationModal] = useState(false);
  const [isSendingPledged, setIsSendingPledged] = useState(false);

  const campaign = useAppSelector((state) => state.campaignSlice.campaign);
  const { walletProvider, address, pledgedAmount } = useAppSelector(
    (state) => state.userSlice
  );
  const dispatch = useAppDispatch();

  const { open: openConnectWallet } = useWeb3Modal();

  useEffect(() => {
    if (!openConfirmModal) setIsSendingPledged(false);
  }, [openConfirmModal]);

  const allowUnpledged =
    pledgedAmount > 0 && amount > 0 && amount <= pledgedAmount;

  const handleConfirm = async () => {
    try {
      if (!walletProvider || !address) {
        openConnectWallet();
        return;
      }
      setIsSendingPledged(true);
      const provider = await new BrowserProvider(walletProvider).getSigner();
      const hdzContract = new HDZContract(provider);
      const crowdFundingContract = new CrowdFundingContract(provider);

      if (actionState === CampaignActionState.Pledged) {
        const allowanceAmount = await hdzContract.allowance(
          address,
          crowdFundingContract._contractAddress
        );

        if (allowanceAmount < amount) {
          await hdzContract.approve(
            crowdFundingContract._contractAddress,
            amount
          );
        }

        await crowdFundingContract.pledge(campaign.id, amount);
      } else if (actionState === CampaignActionState.UnPledged) {
        await crowdFundingContract.unPledge(campaign.id, amount);
      }

      dispatch(
        setCampaign({
          ...campaign,
          pledged:
            actionState === CampaignActionState.Pledged
              ? campaign.pledged + amount
              : campaign.pledged - amount,
        })
      );

      dispatch(
        setUser({
          address,
          walletProvider,
          pledgedAmount:
            actionState === CampaignActionState.Pledged
              ? pledgedAmount + amount
              : pledgedAmount - amount,
        })
      );
      setNotificationModal(true);
      setOpenConfirmModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingPledged(false);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationModal(false);
  };

  return (
    <Box>
      <Typography>
        {actionState === CampaignActionState.Pledged ? "Pledge" : "Unpledged"}
        to the campaign
      </Typography>
      <TextField
        id="outlined-uncontrolled"
        label="Amount"
        type="number"
        fullWidth
        sx={{ my: 2 }}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      {actionState === CampaignActionState.Pledged ? (
        <Box
          bgcolor="#48664d"
          px={2}
          py={1}
          my={2}
          borderRadius={4}
          color="white"
        >
          <Typography>Back it because you believe in it</Typography>
          <Typography>
            Support the project for no reward, just because it speaks to you
          </Typography>
        </Box>
      ) : (
        <Box
          bgcolor="#48664d"
          px={2}
          py={1}
          my={2}
          borderRadius={4}
          color="white"
        >
          <Typography>Your pledged amount is {pledgedAmount}</Typography>
          {pledgedAmount <= 0 && (
            <Typography>
              It seems you haven{"'"}t pledged anything yet.
            </Typography>
          )}
        </Box>
      )}
      {walletProvider ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpenConfirmModal(true)}
          disabled={
            (actionState === CampaignActionState.UnPledged &&
              !allowUnpledged) ||
            amount === 0
          }
        >
          {actionState === CampaignActionState.Pledged ? "Pledge" : "Unpledged"}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => openConnectWallet()}
        >
          Connect Wallet
        </Button>
      )}
      {actionState === CampaignActionState.UnPledged && !allowUnpledged && (
        <Typography color="red" mt={2}>
          The amount should be less than or to equal your pledged!
        </Typography>
      )}
      <ConfirmModal
        open={openConfirmModal}
        isLoading={isSendingPledged}
        amount={amount}
        actionState={actionState}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={handleConfirm}
      />
      <Snackbar
        open={notificationModal}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={handleClose}
        message={`Pledged ${amount} HDZ to this campaign successfully!`}
      />
    </Box>
  );
};

export default PledgeForm;
