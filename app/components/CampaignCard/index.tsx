import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  handleShowCampaignDayState,
  handleShowCampaignStateCard,
  handleShowCampaignStateLabel,
  showShortDescription,
  showSortAddress,
} from "@/app/utils";
import { Box } from "@mui/material";
import Link from "next/link";
import { CampaignState, ICampaign } from "@/app/types/crowdFunding";

const index = ({ campaign }: { campaign: ICampaign }) => {
  const colorCampaignState = React.useMemo(() => {
    switch (campaign.state) {
      case CampaignState.Ended:
        return "red";
      case CampaignState.Started:
        return "green";
      default:
        return "Yellow";
    }
  }, [campaign]);
  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card sx={{ height: 390 }}>
        <CardMedia
          sx={{ height: 142 }}
          image={campaign.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {campaign.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {showShortDescription(campaign.description, 3)}
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Typography variant="body2" color="text.secondary">
              Raised of {campaign.goal} CTC
            </Typography>
            <Typography>{campaign.pledged} CTC</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Typography variant="body2" color="text.secondary">
              {handleShowCampaignStateLabel(campaign.state)}
            </Typography>
            <Typography>{handleShowCampaignDayState(campaign)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Box display="flex" gap={1} alignItems="center">
              <Box
                bgcolor={colorCampaignState}
                width={10}
                height={10}
                borderRadius={50}
              ></Box>
              <Typography>
                {handleShowCampaignStateCard(campaign.state)}
              </Typography>
            </Box>
            <Typography variant="body2">
              By {showSortAddress(campaign.creator)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default index;
