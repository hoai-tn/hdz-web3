import { CampaignState, ICampaign } from "@/app/types/crowdFunding";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICampaignState {
  campaign: ICampaign;
}
const initialState = {
  campaign: {
    id: 0,
    creator: "",
    pledged: 0,
    title: "",
    goal: 0,
    image: "",
    startAt: new Date(),
    endAt: new Date(),
    description: "",
    claimed: false,
    state: CampaignState.None,
  },
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
