import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PledgeForm from "./PledgeForm";
import {
  CampaignActionState,
  CampaignTabState,
} from "@/app/types/crowdFunding";
import { Button } from "@mui/material";
import CreatorTab from "./CreatorTab";

export default function PledgedTabs() {
  const [value, setValue] = React.useState(CampaignTabState.Pledged);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: CampaignTabState
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Pledge" value={CampaignTabState.Pledged} />
            <Tab label="UnPledge" value={CampaignTabState.UnPledged} />
            <Tab label="Refund" value={CampaignTabState.Refund} />
            <Tab label="Creator" value={CampaignTabState.Creator} />
          </TabList>
        </Box>
        <TabPanel value={CampaignTabState.Pledged}>
          <PledgeForm actionState={CampaignActionState.Pledged} />
        </TabPanel>
        <TabPanel value={CampaignTabState.UnPledged}>
          <PledgeForm actionState={CampaignActionState.UnPledged} />
        </TabPanel>
        <TabPanel value={CampaignTabState.Refund}>
          <Button>Refund</Button>
        </TabPanel>
        <TabPanel value={CampaignTabState.Creator}>
          <CreatorTab/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
