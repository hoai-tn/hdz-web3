"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";
interface IConfirmModal {
  open: boolean;
  pledgeAmount: Number;
  isLoading: boolean;
  handleClose: (e: any) => void;
  handleConfirm: () => void;
}

export default function ConfirmModal({
  open,
  handleClose,
  handleConfirm,
  isLoading,
  pledgeAmount,
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
          Pledge {pledgeAmount} HDZ to Campaign
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Pledge this campaign?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}> 
          <CircularProgress disableShrink />
          Submit</Button>
          <LoadingButton loading loadingPosition="start" variant="outlined" onClick={handleClose}>
            Save
          </LoadingButton>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
