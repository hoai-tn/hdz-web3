import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PledgeForm from "./PledgeForm";
import { CampaignActionState } from "@/app/types/crowdFunding";

export default function PledgedTabs() {
  const [value, setValue] = React.useState(CampaignActionState.Pledged);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: CampaignActionState
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pledge" value={CampaignActionState.Pledged} />
            <Tab label="UnPledge" value={CampaignActionState.UnPledged} />
            <Tab label="Claim" value={CampaignActionState.Claimed} />
            <Tab label="Refund" value={CampaignActionState.Refund} />
          </TabList>
        </Box>
        <TabPanel value={CampaignActionState.Pledged}>
          <PledgeForm actionState={CampaignActionState.Pledged} />
        </TabPanel>
        <TabPanel value={CampaignActionState.UnPledged}>
          <PledgeForm actionState={CampaignActionState.UnPledged} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
