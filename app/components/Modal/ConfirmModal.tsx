"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { CampaignActionState } from "@/app/types/crowdFunding";

interface IConfirmModal {
  open: boolean;
  amount: number;
  isLoading: boolean;
  handleClose: (e: any) => void;
  handleConfirm: () => void;
  actionState: CampaignActionState;
}

export default function ConfirmModal({
  open,
  handleClose,
  handleConfirm,
  isLoading,
  amount,
  actionState,
}: IConfirmModal) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        style={{ zIndex: 900 }}
      >
        <DialogTitle id="alert-dialog-title">
          {actionState === CampaignActionState.UnPledged
            ? "UnPledge"
            : "Pledge"}{" "}
          {amount} HDZ to Campaign
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {actionState === CampaignActionState.UnPledged
              ? "UnPledge"
              : "Pledge"}{" "}
            this campaign?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleConfirm}
            loading={isLoading}
            startIcon={isLoading ? <SaveIcon /> : ""}
            variant="contained"
          >
            Submit
          </LoadingButton>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
