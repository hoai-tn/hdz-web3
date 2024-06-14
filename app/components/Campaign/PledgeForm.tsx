import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { BrowserProvider } from "ethers";
import CrowdFundingContract from "@/app/contracts/CrowdFundingContract";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import HDZContract from "@/app/contracts/HDZContract";

const PledgeForm = ({
  campaign,
  handleAmountPledge,
}: {
  campaign: number;
  handleAmountPledge: (amount: number) => void;
}) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState(0);
  const [notificationModal, setNotificationModal] = useState(false);
  const [isSendingPledged, setIsSendingPledged] = useState(false);
  const { open: openConnectWallet } = useWeb3Modal();

  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

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
      const allowanceAmount = await hdzContract.allowance(
        address,
        crowdFundingContract._contractAddress
      );

      if (allowanceAmount < pledgeAmount) {
        await hdzContract.approve(
          crowdFundingContract._contractAddress,
          pledgeAmount
        );
      }

      await crowdFundingContract.pledge(campaign, pledgeAmount);
      handleAmountPledge(pledgeAmount);
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
      <Typography>Pledge to the campaign</Typography>
      <TextField
        id="outlined-uncontrolled"
        label="Amount"
        type="number"
        fullWidth
        sx={{ my: 2 }}
        onChange={(e) => {
          setPledgeAmount(Number(e.target.value));
        }}
      />
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
      {walletProvider ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setOpenConfirmModal(true)}
        >
          Pledge
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

      <ConfirmModal
        open={openConfirmModal}
        isLoading={isSendingPledged}
        pledgeAmount={pledgeAmount}
        handleClose={() => setOpenConfirmModal(false)}
        handleConfirm={handleConfirm}
      />
      <Snackbar
        open={notificationModal}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        onClose={handleClose}
        message={`Pledged ${pledgeAmount} HDZ to this campaign successfully!`}
      />
    </Box>
  );
};

export default PledgeForm;
