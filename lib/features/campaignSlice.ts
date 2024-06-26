import { CampaignState, ICampaign } from "@/app/types/crowdFunding";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICampaignState {
  campaign: ICampaign | null;
}
const initialState = {
  campaign: null,
} satisfies ICampaignState as ICampaignState;

const CampaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setCampaign(state, { payload }) {
      state.campaign = { ...payload };
    },
  },
});

export const { setCampaign } = CampaignSlice.actions;
export default CampaignSlice.reducer;
