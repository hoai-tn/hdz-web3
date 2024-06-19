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
  amount?: number;
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
  const title = React.useMemo(() => {
    switch (actionState) {
      case CampaignActionState.UnPledged:
        return `UnPledge ${amount} HDZ from this Campaign`;
      case CampaignActionState.Pledged:
        return `Pledged ${amount} HDZ to this Campaign`;
      case CampaignActionState.Cancel:
        return `Cancel this Campaign`;
      case CampaignActionState.Refund:
        return `Refund 20 HDZ to this Campaign`;
      case CampaignActionState.Claimed:
        return `Claim this Campaign`;
      default:
        return "";
    }
  }, [actionState, amount]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        style={{ zIndex: 900 }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit?
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
