"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, FormGroup, TextField, Typography } from "@mui/material";
import { ICampaign, ICreateCampaign } from "@/app/types/crowdFunding";

interface ICreateCampaignModal {
  open: boolean;
  handleClose: (e: any) => void;
  handleCreateCampaign: (campaign: ICreateCampaign) => void;
}

export default function CreateCampaignModal({
  open,
  handleClose,
  handleCreateCampaign,
}: ICreateCampaignModal) {
  const [campaign, setCampaign] = React.useState<ICreateCampaign>({
    title: "",
    goal: 0,
    image: "",
    startDate: 0,
    endDate: 0,
    description: "",
  });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ zIndex: 900 }}
      >
        <DialogTitle id="alert-dialog-title">{"Create Campaign"}</DialogTitle>
        <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="outlined-uncontrolled"
            label="Title"
            fullWidth
            onChange={(e) => {
              setCampaign({ ...campaign, title: e.target.value });
            }}
          />
          <TextField
            id="outlined-uncontrolled"
            label="Goal"
            fullWidth
            onChange={(e) => {
              setCampaign({ ...campaign, goal: Number(e.target.value) });
            }}
          />
          <TextField
            id="outlined-uncontrolled"
            label="Image URL"
            fullWidth
            onChange={(e) => {
              setCampaign({ ...campaign, image: e.target.value });
            }}
          />
          <FormGroup>
            <Typography>Start Date</Typography>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={(e) => {
                setCampaign({
                  ...campaign,
                  startDate: new Date(e.target.value).getTime() / 1000,
                });
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <Typography>End Date</Typography>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={(e) => {
                setCampaign({
                  ...campaign,
                  endDate: new Date(e.target.value).getTime() / 1000,
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Typography>Description</Typography>
            <textarea
              className="text-area"
              rows={4}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              onChange={(e) => {
                setCampaign({ ...campaign, description: e.target.value });
              }}
            />
          </FormGroup>
        </Box>
        <DialogActions>
          <Button onClick={(e) => handleCreateCampaign(campaign)}>
            Submit
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
