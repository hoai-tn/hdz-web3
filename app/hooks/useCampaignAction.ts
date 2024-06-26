import { useAppSelector } from "@/lib/hooks";
import { CampaignActionState, CampaignState } from "../types/crowdFunding";

const useCampaignAction = () => {
  const { campaign } = useAppSelector((state) => state.campaignSlice);
  const user = useAppSelector((state) => state.userSlice);

  const handleCallCampaignContract = async (state: CampaignActionState) => {
    switch (state) {
    }
  };
};
